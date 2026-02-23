<?php

use Illuminate\Support\Facades\Route;

// Serve React SPA - fallback to index.html for all non-API routes
Route::get('{any}', function () {
    return file_exists(public_path('index.html'))
        ? response()->file(public_path('index.html'))
        : response()->json(['error' => 'Frontend not built'], 404);
})->where('any', '.*');
