<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attempt extends Model
{
    protected $fillable = [
        'user_id',
        'exam_id',
        'status',
        'ai_score',
        'ai_feedback',
    ];

    protected $casts = [
        'ai_score' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function proctorLogs()
    {
        return $this->hasMany(ProctorLog::class);
    }
}
