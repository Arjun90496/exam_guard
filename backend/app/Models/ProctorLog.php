<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProctorLog extends Model
{
    protected $fillable = [
        'attempt_id',
        'event_type',
        'snapshot_url',
        'timestamp',
    ];

    protected $casts = [
        'timestamp' => 'datetime',
    ];

    public function attempt()
    {
        return $this->belongsTo(Attempt::class);
    }
}
