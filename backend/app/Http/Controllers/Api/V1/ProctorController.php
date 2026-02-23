<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Attempt;
use App\Models\ProctorLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProctorController extends Controller
{
    public function heartbeat(Request $request)
    {
        $request->validate([
            'attempt_id' => 'required|exists:attempts,id',
        ]);

        $cacheKey = "exam_heartbeat:{$request->attempt_id}";
        \Illuminate\Support\Facades\Redis::set($cacheKey, now()->toDateTimeString(), 'EX', 60);

        return response()->json(['status' => 'Heartbeat received']);
    }

    public function log(Request $request)
    {
        $request->validate([
            'attempt_id' => 'required|exists:attempts,id',
            'event_type' => 'required|string',
            'snapshot' => 'nullable|string', // Base64 image
        ]);

        $snapshotUrl = null;

        if ($request->snapshot) {
            $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $request->snapshot));
            $fileName = 'snapshots/' . uniqid() . '.jpg';
            
            // Upload to S3 (requires AWS config)
            Storage::disk('s3')->put($fileName, $imageData);
            $snapshotUrl = Storage::disk('s3')->url($fileName);
        }

        $log = ProctorLog::create([
            'attempt_id' => $request->attempt_id,
            'event_type' => $request->event_type,
            'snapshot_url' => $snapshotUrl,
            'timestamp' => now(),
        ]);

        // Auto-submit on 3rd violation
        $violationCount = ProctorLog::where('attempt_id', $request->attempt_id)->count();
        if ($violationCount >= 3) {
            $attempt = Attempt::find($request->attempt_id);
            if ($attempt && $attempt->status !== 'submitted') {
                $attempt->update(['status' => 'submitted']);
            }
        }

        return response()->json($log, 201);
    }
}
