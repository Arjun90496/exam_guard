import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Shield, Users, AlertTriangle, Clock, Plus, BarChart2, LogOut,
  Bell, CheckCircle2, ChevronRight, Activity, Eye, Flag, Wifi, WifiOff, X,
  FileText, PenTool, Shuffle, Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockMonitorStudents, type MonitorStudent } from "@/lib/mockData";
import { createExamSchema, type CreateExamFormData } from "@/lib/schemas";

type TeacherTab = "monitor" | "create" | "overview";
type CreateStep = 1 | 2 | 3;

const statusIcons = {
  online: <div className="w-2 h-2 rounded-full bg-success animate-pulse" />,
  warning: <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />,
  flagged: <div className="w-2 h-2 rounded-full bg-danger animate-pulse-glow" />,
  offline: <div className="w-2 h-2 rounded-full bg-muted-foreground" />,
};

const statusLabels: Record<MonitorStudent["status"], string> = {
  online: "Online",
  warning: "Warning",
  flagged: "Flagged",
  offline: "Offline",
};

const statusCardCls: Record<MonitorStudent["status"], string> = {
  online: "border-success/20 hover:border-success/40",
  warning: "border-warning/30 hover:border-warning/50",
  flagged: "border-danger/40 hover:border-danger/60 bg-danger/5",
  offline: "border-border/30 opacity-60",
};

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<TeacherTab>("monitor");
  const [createStep, setCreateStep] = useState<CreateStep>(1);
  const [questionType, setQuestionType] = useState<"mcq" | "descriptive" | "mixed">("mcq");
  const [selectedStudent, setSelectedStudent] = useState<MonitorStudent | null>(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<CreateExamFormData>({
    resolver: zodResolver(createExamSchema),
    defaultValues: { duration: 60, totalMarks: 100, passingMarks: 40, questionType: "mcq" },
  });

  const onSubmit = (data: CreateExamFormData) => {
    if (createStep < 3) {
      setCreateStep((prev) => (prev + 1) as CreateStep);
    } else {
      alert("Exam created successfully! (Mock)");
      setCreateStep(1);
    }
  };

  const onlineCount = mockMonitorStudents.filter((s) => s.status === "online").length;
  const warningCount = mockMonitorStudents.filter((s) => s.status === "warning").length;
  const flaggedCount = mockMonitorStudents.filter((s) => s.status === "flagged").length;
  const offlineCount = mockMonitorStudents.filter((s) => s.status === "offline").length;

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
            <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground ml-1">Teacher</Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-success bg-success/10 border border-success/20 rounded-full px-3 py-1">
              <Activity className="w-3 h-3" />
              Exam Live
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs font-bold text-accent">
              TP
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
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-extrabold tracking-tight mb-1">Teacher Dashboard</h1>
          <p className="text-muted-foreground text-sm">Manage exams and monitor students in real-time</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-secondary/50 rounded-xl border border-border/50 mb-6 w-fit">
          {([
            { id: "monitor", label: "Monitor Room", icon: Eye },
            { id: "create", label: "Create Exam", icon: Plus },
            { id: "overview", label: "Overview", icon: BarChart2 },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-glow-sm"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Monitor Room */}
        {activeTab === "monitor" && (
          <div className="animate-fade-in">
            {/* Stats bar */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { label: "Online", value: onlineCount, cls: "text-success", bg: "bg-success/10 border-success/20" },
                { label: "Warning", value: warningCount, cls: "text-warning", bg: "bg-warning/10 border-warning/20" },
                { label: "Flagged", value: flaggedCount, cls: "text-danger", bg: "bg-danger/10 border-danger/20" },
                { label: "Offline", value: offlineCount, cls: "text-muted-foreground", bg: "bg-secondary border-border/50" },
              ].map((stat) => (
                <div key={stat.label} className={`p-4 rounded-xl border ${stat.bg} text-center`}>
                  <p className={`text-2xl font-extrabold ${stat.cls}`}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm text-muted-foreground">
                LIVE — {mockMonitorStudents.length} students enrolled
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Refreshing live
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockMonitorStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`p-4 rounded-xl border gradient-card cursor-pointer transition-all duration-200 ${statusCardCls[student.status]}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground border border-border/50">
                        {student.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-sm leading-tight">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.lastSeen}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {statusIcons[student.status]}
                      <span className={`
                        ${student.status === "online" ? "text-success" : ""}
                        ${student.status === "warning" ? "text-warning" : ""}
                        ${student.status === "flagged" ? "text-danger" : ""}
                        ${student.status === "offline" ? "text-muted-foreground" : ""}
                      `}>
                        {statusLabels[student.status]}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{student.progress}%</span>
                      </div>
                      <Progress value={student.progress} className="h-1.5" />
                    </div>

                    {student.violations > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-warning">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        <span>{student.violations} violation{student.violations > 1 ? "s" : ""}</span>
                      </div>
                    )}

                    {student.flagReason && (
                      <p className="text-[10px] text-danger/80 leading-tight">{student.flagReason}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Student detail modal */}
            {selectedStudent && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                <div className="w-full max-w-md glass rounded-2xl border border-border p-6 animate-scale-in">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-secondary border border-border/50 flex items-center justify-center font-bold text-foreground">
                        {selectedStudent.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedStudent.name}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {statusIcons[selectedStudent.status]}
                          <span className="text-xs text-muted-foreground">{statusLabels[selectedStudent.status]}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedStudent(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-secondary/50 border border-border/50 text-center">
                        <p className="text-xl font-bold text-primary">{selectedStudent.progress}%</p>
                        <p className="text-xs text-muted-foreground">Progress</p>
                      </div>
                      <div className="p-3 rounded-xl bg-secondary/50 border border-border/50 text-center">
                        <p className={`text-xl font-bold ${selectedStudent.violations > 0 ? "text-danger" : "text-success"}`}>
                          {selectedStudent.violations}
                        </p>
                        <p className="text-xs text-muted-foreground">Violations</p>
                      </div>
                    </div>

                    {selectedStudent.flagReason && (
                      <div className="p-3 rounded-xl bg-danger/10 border border-danger/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Flag className="w-3.5 h-3.5 text-danger" />
                          <span className="text-xs font-medium text-danger">Flag Reason</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{selectedStudent.flagReason}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 text-xs border-warning/40 text-warning hover:bg-warning/10">
                        <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
                        Send Warning
                      </Button>
                      <Button variant="outline" className="flex-1 text-xs border-danger/40 text-danger hover:bg-danger/10">
                        <X className="w-3.5 h-3.5 mr-1.5" />
                        Terminate Exam
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Create Exam Wizard */}
        {activeTab === "create" && (
          <div className="max-w-2xl animate-fade-in">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${createStep > step
                        ? "gradient-primary text-primary-foreground shadow-glow-sm"
                        : createStep === step
                          ? "gradient-primary text-primary-foreground shadow-glow-sm"
                          : "bg-secondary border border-border/50 text-muted-foreground"
                      }`}
                  >
                    {createStep > step ? <CheckCircle2 className="w-4 h-4" /> : step}
                  </div>
                  <span className={`text-sm ${createStep >= step ? "text-foreground" : "text-muted-foreground"}`}>
                    {step === 1 ? "Basics" : step === 2 ? "Questions" : "Review"}
                  </span>
                  {step < 3 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {createStep === 1 && (
                <div className="space-y-5 p-6 rounded-2xl border border-border/50 gradient-card">
                  <h2 className="font-bold text-lg">Exam Details</h2>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Exam Title</Label>
                    <Input
                      placeholder="e.g., Advanced Data Structures – Mid Term 2026"
                      className="bg-secondary/50 border-border/60 focus:border-primary/50 h-11"
                      {...register("title")}
                    />
                    {errors.title && <p className="text-xs text-danger">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Subject</Label>
                    <Input
                      placeholder="e.g., Computer Science"
                      className="bg-secondary/50 border-border/60 focus:border-primary/50 h-11"
                      {...register("subject")}
                    />
                    {errors.subject && <p className="text-xs text-danger">{errors.subject.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Duration (minutes)</Label>
                      <Input
                        type="number"
                        className="bg-secondary/50 border-border/60 focus:border-primary/50 h-11"
                        {...register("duration", { valueAsNumber: true })}
                      />
                      {errors.duration && <p className="text-xs text-danger">{errors.duration.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Total Marks</Label>
                      <Input
                        type="number"
                        className="bg-secondary/50 border-border/60 focus:border-primary/50 h-11"
                        {...register("totalMarks", { valueAsNumber: true })}
                      />
                      {errors.totalMarks && <p className="text-xs text-danger">{errors.totalMarks.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Start Time</Label>
                    <Input
                      type="datetime-local"
                      className="bg-secondary/50 border-border/60 focus:border-primary/50 h-11"
                      {...register("startTime")}
                    />
                    {errors.startTime && <p className="text-xs text-danger">{errors.startTime.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Instructions (optional)</Label>
                    <textarea
                      placeholder="Enter exam instructions for students..."
                      className="w-full px-3 py-2.5 rounded-lg bg-secondary/50 border border-border/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm resize-none h-24 text-foreground placeholder:text-muted-foreground"
                      {...register("instructions")}
                    />
                  </div>

                  <Button type="submit" className="w-full gradient-primary text-primary-foreground shadow-glow-sm font-medium h-11">
                    Continue to Questions
                    <ChevronRight className="ml-1.5 w-4 h-4" />
                  </Button>
                </div>
              )}

              {createStep === 2 && (
                <div className="space-y-5 p-6 rounded-2xl border border-border/50 gradient-card">
                  <h2 className="font-bold text-lg">Question Configuration</h2>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Question Type</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["mcq", "descriptive", "mixed"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setQuestionType(type)}
                          className={`p-3 rounded-xl border text-sm font-medium text-left transition-all ${questionType === type
                              ? "border-primary/50 bg-primary/10 text-primary"
                              : "border-border/50 text-muted-foreground hover:border-border"
                            }`}
                        >
                          <div className="mb-1 flex justify-center text-foreground">
                            {type === "mcq" ? <FileText className="w-6 h-6" /> : type === "descriptive" ? <PenTool className="w-6 h-6" /> : <Shuffle className="w-6 h-6" />}
                          </div>
                          <div>{type === "mcq" ? "MCQ" : type === "descriptive" ? "Descriptive" : "Mixed"}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {(questionType === "mcq" || questionType === "mixed") && (
                    <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 space-y-3">
                      <p className="text-sm font-medium">Sample MCQ Structure</p>
                      <div className="space-y-2">
                        <Input
                          placeholder="Question text..."
                          className="bg-background/50 border-border/60 h-10 text-sm"
                        />
                        {["Option A", "Option B", "Option C", "Option D"].map((opt, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input type="radio" name="correct" className="accent-primary" />
                            <Input
                              placeholder={opt}
                              className="bg-background/50 border-border/60 h-9 text-sm flex-1"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">Select the radio button to mark the correct answer</p>
                    </div>
                  )}

                  {(questionType === "descriptive" || questionType === "mixed") && (
                    <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 space-y-3">
                      <p className="text-sm font-medium">Answer Key / Rubric</p>
                      <Input
                        placeholder="Descriptive question text..."
                        className="bg-background/50 border-border/60 h-10 text-sm"
                      />
                      <textarea
                        placeholder="Model answer / grading rubric for AI evaluation..."
                        className="w-full px-3 py-2.5 rounded-lg bg-background/50 border border-border/60 text-sm resize-none h-20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                      />
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                        AI will compare student answers against this rubric
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-border/60 flex-1"
                      onClick={() => setCreateStep(1)}
                    >
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 gradient-primary text-primary-foreground shadow-glow-sm font-medium">
                      Review & Publish
                      <ChevronRight className="ml-1.5 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {createStep === 3 && (
                <div className="space-y-5 p-6 rounded-2xl border border-border/50 gradient-card">
                  <h2 className="font-bold text-lg">Review & Publish</h2>

                  <div className="space-y-3">
                    {[
                      { label: "Question Type", value: questionType.toUpperCase() },
                      { label: "Duration", value: `${watch("duration") || 60} minutes` },
                      { label: "Total Marks", value: watch("totalMarks") || 100 },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between py-2.5 border-b border-border/30 last:border-0">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="text-sm font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                      <Shield className="w-4 h-4" />
                      Proctoring Settings
                    </div>
                    {["Face detection enabled", "Tab-switch monitoring", "Copy/paste disabled", "Fullscreen required"].map((s) => (
                      <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                        {s}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-border/60 flex-1"
                      onClick={() => setCreateStep(2)}
                    >
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 gradient-primary text-primary-foreground shadow-glow font-semibold">
                      <Rocket className="w-4 h-4 mr-2" /> Publish Exam
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { label: "Total Exams", value: "12", sub: "3 active this week", icon: BookIcon, color: "text-primary", bg: "bg-primary/10" },
                { label: "Total Students", value: "847", sub: "+23 this month", icon: Users, color: "text-accent", bg: "bg-accent/10" },
                { label: "Avg Completion", value: "94%", sub: "Industry avg: 87%", icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
                { label: "Violations Caught", value: "156", sub: "Across all exams", icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
                { label: "AI Grade Accuracy", value: "98.2%", sub: "vs human scoring", icon: Activity, color: "text-primary", bg: "bg-primary/10" },
                { label: "Avg Score", value: "76.4%", sub: "All time average", icon: BarChart2, color: "text-accent", bg: "bg-accent/10" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl border border-border/50 gradient-card">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-extrabold mb-1">{stat.value}</p>
                  <p className="text-sm font-medium mb-0.5">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Small icon placeholder
const BookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);