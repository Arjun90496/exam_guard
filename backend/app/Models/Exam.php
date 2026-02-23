<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $fillable = [
        'teacher_id',
        'title',
        'description',
        'answer_key_json',
        'duration_minutes',
        'fee',
    ];

    protected $casts = [
        'answer_key_json' => 'array',
        'fee' => 'decimal:2',
    ];

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function attempts()
    {
        return $this->hasMany(Attempt::class);
    }
}
