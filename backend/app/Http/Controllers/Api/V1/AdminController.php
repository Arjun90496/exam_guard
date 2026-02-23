<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Exam;
use App\Models\Attempt;
use App\Models\Transaction;

class AdminController extends Controller
{
    /**
     * Get high-level stats for the Admin Dashboard.
     */
    public function dashboardStats()
    {
        $totalUsers = User::count();
        $totalTeachers = User::where('role', 'teacher')->count();
        $totalStudents = User::where('role', 'student')->count();
        
        $totalExams = Exam::count();
        $activeExams = Exam::where('status', 'published')->count();
        
        $totalAttempts = Attempt::count();
        
        // Ensure Transaction model exists. Let's assume there is a revenue if it exists.
        $totalRevenue = 0;
        if (class_exists(Transaction::class)) {
            $totalRevenue = Transaction::where('status', 'completed')->sum('amount');
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'users' => [
                    'total' => $totalUsers,
                    'teachers' => $totalTeachers,
                    'students' => $totalStudents,
                ],
                'exams' => [
                    'total' => $totalExams,
                    'active' => $activeExams,
                ],
                'attempts' => $totalAttempts,
                'revenue' => $totalRevenue,
            ]
        ]);
    }

    /**
     * Get paginated list of all users.
     */
    public function users(Request $request)
    {
        $query = User::query();
        
        if ($request->has('role')) {
            $query->where('role', $request->role);
        }
        
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->latest()->paginate($request->input('per_page', 15));

        return response()->json([
            'status' => 'success',
            'data' => $users
        ]);
    }

    /**
     * Get paginated list of all exams.
     */
    public function exams(Request $request)
    {
        $query = Exam::with(['teacher:id,name,email'])->withCount('attempts');
        
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $exams = $query->latest()->paginate($request->input('per_page', 15));

        return response()->json([
            'status' => 'success',
            'data' => $exams
        ]);
    }

    /**
     * Get paginated list of transations/subscriptions.
     */
    public function transactions(Request $request)
    {
        if (!class_exists(Transaction::class)) {
             return response()->json([
                'status' => 'success',
                'data' => ['data' => [], 'total' => 0]
            ]);
        }
        
        $transactions = Transaction::with(['user:id,name,email'])->latest()->paginate($request->input('per_page', 15));

        return response()->json([
            'status' => 'success',
            'data' => $transactions
        ]);
    }
}

