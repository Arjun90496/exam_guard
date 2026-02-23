<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'exam_id',
        'type',
        'content',
        'points',
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}
