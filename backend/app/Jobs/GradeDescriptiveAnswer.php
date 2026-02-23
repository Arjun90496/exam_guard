<?php

namespace App\Jobs;

use App\Models\Attempt;
use App\Models\Question;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use OpenAI\Laravel\Facades\OpenAI;

class GradeDescriptiveAnswer implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $attempt;
    protected $question;
    protected $studentAnswer;

    /**
     * Create a new job instance.
     */
    public function __construct(Attempt $attempt, Question $question, string $studentAnswer)
    {
        $this->attempt = $attempt;
        $this->question = $question;
        $this->studentAnswer = $studentAnswer;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $client = \OpenAI::client(config('services.openai.api_key'));

        $prompt = "Question: {$this->question->content}\n" .
                  "Ideal Answer Key: {$this->question->exam->answer_key_json}\n" .
                  "Student Answer: {$this->studentAnswer}\n" .
                  "Max Points: {$this->question->points}\n\n" .
                  "Grade fairly. Output ONLY in this format: Score: [integer]\nFeedback: [2 concise sentences].";

        $result = $client->chat()->create([
            'model' => 'gpt-4o',
            'messages' => [
                ['role' => 'user', 'content' => $prompt],
            ],
        ]);

        $content = $result->choices[0]->message->content;
        
        preg_match('/Score:\s*(\d+)/i', $content, $scoreMatch);
        preg_match('/Feedback:\s*(.*)/is', $content, $feedbackMatch);

        $score = isset($scoreMatch[1]) ? (int) $scoreMatch[1] : 0;
        $feedback = isset($feedbackMatch[1]) ? trim($feedbackMatch[1]) : "No feedback provided.";

        $this->attempt->update([
            'ai_score' => ($this->attempt->ai_score ?? 0) + $score,
            'ai_feedback' => ($this->attempt->ai_feedback ? $this->attempt->ai_feedback . "\n" : "") . $feedback,
            'status' => 'graded'
        ]);

        \Illuminate\Support\Facades\Log::info("AI Graded Attempt {$this->attempt->id} Question {$this->question->id}: Score {$score}");
    }
}
