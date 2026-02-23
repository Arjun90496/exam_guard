<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ExamController;
use App\Http\Controllers\Api\V1\ProctorController;

Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        
        // Student Routes
        Route::middleware(['role:student', 'verified_otp'])->group(function () {
            Route::get('/exams', [ExamController::class, 'index']);
            Route::get('/student-dashboard', [ExamController::class, 'studentDashboard']);
            Route::get('/exams/{id}', [ExamController::class, 'show']);
            Route::post('/exams/{id}/start', [ExamController::class, 'start']);
            Route::post('/proctor/log', [ProctorController::class, 'log'])->middleware('throttle:exams');
            Route::post('/proctor/heartbeat', [ProctorController::class, 'heartbeat'])->middleware('throttle:exams');
        });

        // Teacher Routes
        Route::middleware(['role:teacher', 'verified_otp'])->group(function () {
            Route::post('/exams', [ExamController::class, 'store']);
            Route::get('/teacher-dashboard', [ExamController::class, 'teacherDashboard']);
        });

        // Admin Routes
        Route::middleware(['role:admin', 'verified_otp'])->prefix('admin')->group(function () {
            Route::get('/dashboard-stats', [\App\Http\Controllers\Api\V1\AdminController::class, 'dashboardStats']);
            Route::get('/users', [\App\Http\Controllers\Api\V1\AdminController::class, 'users']);
            Route::get('/exams', [\App\Http\Controllers\Api\V1\AdminController::class, 'exams']);
            Route::get('/transactions', [\App\Http\Controllers\Api\V1\AdminController::class, 'transactions']);
        });
    });
});
