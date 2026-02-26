import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield, BookOpen, Clock, Trophy, AlertTriangle, Lock, Play,
  TrendingUp, ChevronRight, Bell, LogOut, User, Calendar, ClipboardList, BarChart2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockExams, mockResults } from "@/lib/mockData";

const gradeColor: Record<string, string> = {
  A: "text-success",
  "A+": "text-success",
  B: "text-primary",
  "B+": "text-primary",
  C: "text-warning",
  "C+": "text-warning",
  D: "text-danger",
  F: "text-danger",
};

const statusConfig = {
  active: { label: "Live Now", cls: "bg-success/15 text-success border-success/30 animate-pulse", dot: "bg-success" },
  upcoming: { label: "Upcoming", cls: "bg-primary/15 text-primary border-primary/30", dot: "bg-primary" },
  locked: { label: "Pay to Unlock", cls: "bg-warning/15 text-warning border-warning/30", dot: "bg-warning" },
  completed: { label: "Completed", cls: "bg-muted text-muted-foreground border-border", dot: "bg-muted-foreground" },
};

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"exams" | "results">("exams");

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="glass border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-glow-sm">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold tracking-tight">
              ExamShield<span className="text-gradient">AI</span>
            </span>
            <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground ml-1">Student</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
              DS
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground gap-1" asChild>
              <Link to="/login">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign out</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight mb-1">
                Good morning, Demo Student
              </h1>
              <p className="text-muted-foreground text-sm">
                You have <span className="text-warning font-medium">1 active exam</span> and 1 upcoming this week.
              </p>
            </div>
            <div className="hidden sm:flex gap-3">
              <div className="p-4 rounded-xl gradient-card border border-border/50 text-center min-w-[90px]">
                <p className="text-2xl font-extrabold text-gradient">3</p>
                <p className="text-xs text-muted-foreground mt-0.5">Completed</p>
              </div>
              <div className="p-4 rounded-xl gradient-card border border-border/50 text-center min-w-[90px]">
                <p className="text-2xl font-extrabold text-success">82%</p>
                <p className="text-xs text-muted-foreground mt-0.5">Avg Score</p>
              </div>
              <div className="p-4 rounded-xl gradient-card border border-border/50 text-center min-w-[90px]">
                <p className="text-2xl font-extrabold text-primary">0</p>
                <p className="text-xs text-muted-foreground mt-0.5">Violations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-secondary/50 rounded-xl border border-border/50 mb-6 w-fit">
          {(["exams", "results"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-glow-sm"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {tab === "exams" ? <ClipboardList className="w-4 h-4 mr-2" /> : <BarChart2 className="w-4 h-4 mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Exams Tab */}
        {activeTab === "exams" && (
          <div className="space-y-4 animate-fade-in">
            {mockExams.map((exam) => {
              const sc = statusConfig[exam.status];
              return (
                <div
                  key={exam.id}
                  className="p-6 rounded-2xl border border-border/50 gradient-card hover:border-border transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className={`text-xs border px-2.5 py-0.5 font-medium ${sc.cls}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} mr-1.5 inline-block`} />
                          {sc.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground">
                          {exam.subject}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-base mb-1 truncate">{exam.title}</h3>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {exam.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {exam.questionsCount} questions
                        </span>
                        <span className="flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          {exam.totalMarks} marks
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(exam.startTime)}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {exam.status === "active" && (
                        <Button
                          className="gradient-primary text-primary-foreground shadow-glow-sm font-medium gap-1.5"
                          onClick={() => navigate("/exam/exam-001")}
                        >
                          <Play className="w-3.5 h-3.5" />
                          Start Exam
                        </Button>
                      )}
                      {exam.status === "upcoming" && (
                        <Button variant="outline" className="border-border/60 gap-1.5" disabled>
                          <Clock className="w-3.5 h-3.5" />
                          Scheduled
                        </Button>
                      )}
                      {exam.status === "locked" && (
                        <Button
                          variant="outline"
                          className="border-warning/40 text-warning hover:bg-warning/10 gap-1.5"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          Pay ${exam.price}
                        </Button>
                      )}
                      {exam.status === "completed" && (
                        <Button variant="outline" className="border-border/50 gap-1.5 text-muted-foreground">
                          <Trophy className="w-3.5 h-3.5" />
                          View Result
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Results Tab */}
        {activeTab === "results" && (
          <div className="space-y-4 animate-fade-in">
            {mockResults.map((result) => (
              <div
                key={result.id}
                className="p-6 rounded-2xl border border-border/50 gradient-card hover:border-border transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-base mb-1">{result.examTitle}</h3>
                    <p className="text-xs text-muted-foreground">
                      {new Date(result.completedAt).toLocaleDateString("en-US", {
                        month: "long", day: "numeric", year: "numeric"
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-3xl font-extrabold ${gradeColor[result.grade] || "text-foreground"}`}>
                      {result.grade}
                    </p>
                    <p className="text-xs text-muted-foreground">{result.percentage}%</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>Score: {result.score}/{result.totalMarks}</span>
                    <span>{result.percentage}%</span>
                  </div>
                  <Progress
                    value={result.percentage}
                    className="h-2"
                  />
                </div>

                {result.violations > 0 && (
                  <div className="flex items-center gap-2 mb-3 p-2.5 rounded-lg bg-warning/10 border border-warning/20">
                    <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />
                    <p className="text-xs text-warning">
                      {result.violations} proctoring violation{result.violations > 1 ? "s" : ""} recorded
                    </p>
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-secondary/50 border border-border/50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    <p className="text-xs font-medium text-primary">AI Feedback</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{result.aiFeedback}</p>
                </div>

                <div className="mt-3 flex justify-end">
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
                    Detailed Report
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}