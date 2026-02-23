<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\Question;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    public function index()
    {
        return response()->json(Exam::with('teacher')->get());
    }

    public function studentDashboard(Request $request)
    {
        $user = $request->user();

        $availableExams = Exam::whereDoesntHave('attempts', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->get();

        $myAttempts = $user->attempts()->with('exam')->get();

        return response()->json([
            'available_exams' => $availableExams,
            'my_attempts' => $myAttempts,
        ]);
    }

    public function teacherDashboard(Request $request)
    {
        $user = $request->user();

        $myExams = Exam::where('teacher_id', $user->id)
            ->withCount('attempts')
            ->get();

        // Fetch latest 10 ProctorLogs via Attempt.Exam relationship filtering
        $latestLogs = \App\Models\ProctorLog::whereHas('attempt', function ($query) use ($user) {
            $query->whereHas('exam', function ($q) use ($user) {
                $q->where('teacher_id', $user->id);
            });
        })->with(['attempt.user', 'attempt.exam'])
          ->latest('timestamp')
          ->limit(10)
          ->get();

        return response()->json([
            'my_exams' => $myExams,
            'latest_proctor_logs' => $latestLogs,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:1',
            'fee' => 'required|numeric|min:0',
            'questions' => 'required|array|min:1',
            'questions.*.content' => 'required|string',
            'questions.*.type' => 'required|in:mcq,descriptive',
            'questions.*.points' => 'required|integer|min:1',
        ]);

        $exam = Exam::create([
            'teacher_id' => $request->user()->id,
            'title' => $request->title,
            'description' => $request->description,
            'duration_minutes' => $request->duration_minutes,
            'fee' => $request->fee,
        ]);

        foreach ($request->questions as $q) {
            $exam->questions()->create($q);
        }

        return response()->json($exam->load('questions'), 201);
    }

    public function start(Request $request, $id)
    {
        $user = $request->user();
        $exam = Exam::findOrFail($id);

        // Check for successful payment/transaction
        $hasPaid = \App\Models\Transaction::where('user_id', $user->id)
            ->where('status', 'completed')
            ->where('amount', '>=', $exam->fee)
            ->exists();

        if ($exam->fee > 0 && !$hasPaid) {
            return response()->json(['message' => 'Please complete the payment to start this exam.'], 402);
        }

        $attempt = \App\Models\Attempt::create([
            'user_id' => $user->id,
            'exam_id' => $exam->id,
            'status' => 'started',
        ]);

        return response()->json([
            'message' => 'Exam started successfully.',
            'attempt' => $attempt,
            'exam' => $exam->load('questions'),
        ]);
    }

    public function show($id)
    {
        return response()->json(Exam::with('questions')->findOrFail($id));
    }
}
