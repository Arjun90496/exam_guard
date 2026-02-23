import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "@/features/marketing/Index";
import Login from "@/features/auth/Login";
import Signup from "@/features/auth/Signup";
import StudentDashboard from "@/features/student/StudentDashboard";
import TeacherDashboard from "@/features/teacher/TeacherDashboard";
import ExamInterface from "@/features/exam/ExamInterface";
import NotFound from "@/features/marketing/NotFound";

import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/features/admin/AdminDashboard";
import AdminUsers from "@/features/admin/Users";
import AdminExams from "@/features/admin/Exams";
import AdminTransactions from "@/features/admin/Transactions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/exam/:id" element={<ExamInterface />} />
          <Route path="/features" element={<Navigate to="/#features" replace />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="exams" element={<AdminExams />} />
            <Route path="transactions" element={<AdminTransactions />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
