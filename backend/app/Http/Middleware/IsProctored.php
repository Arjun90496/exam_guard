<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsProctored
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // This middleware ensures the request is coming from an active proctored session
        // In a real scenario, we might check an 'active_attempt_id' in session or a signed header
        // For now, we ensure the user is an authenticated student
        
        if (!$request->user() || $request->user()->role !== 'student') {
            return response()->json([
                'message' => 'Access denied. Student role required.'
            ], 403);
        }

        return $next($request);
    }
}
