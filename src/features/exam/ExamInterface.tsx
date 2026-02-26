import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield, AlertTriangle, ChevronLeft, ChevronRight, Flag, Clock,
  Eye, Maximize, Camera, X, CheckCircle2, BookOpen, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useExamStore } from "@/stores/examStore";
import { mockQuestions } from "@/lib/mockData";
import type { Question } from "@/lib/mockData";

// ─── Violation Warning Modal ───────────────────────────────────────────────
function ViolationModal({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-danger/50 bg-danger/10 p-6 animate-scale-in shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-danger/20 border border-danger/40 flex items-center justify-center shrink-0 animate-pulse-glow">
            <AlertTriangle className="w-6 h-6 text-danger" />
          </div>
          <div>
            <h3 className="font-bold text-danger text-lg mb-1">Proctoring Violation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">This violation has been recorded and reported.</p>
          <Button
            size="sm"
            variant="outline"
            className="border-danger/40 text-danger hover:bg-danger/10"
            onClick={onDismiss}
          >
            I Understand
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Webcam Feed ───────────────────────────────────────────────────────────
function WebcamFeed({ onFaceViolation }: { onFaceViolation: (reason: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [faceStatus, setFaceStatus] = useState<"ok" | "none" | "multiple" | "requesting">("requesting");
  const [cameraError, setCameraError] = useState(false);
  const noFaceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let active = true;
    let currentStream: MediaStream | null = null;

    navigator.mediaDevices
      .getUserMedia({ video: { width: 320, height: 240, facingMode: "user" } })
      .then((s) => {
        if (!active) { s.getTracks().forEach(t => t.stop()); return; }
        setStream(s);
        currentStream = s;
        if (videoRef.current) videoRef.current.srcObject = s;
        setFaceStatus("ok");

        // Simulate AI face detection
        const simulate = () => {
          if (!active) return;
          const rand = Math.random();
          if (rand < 0.85) {
            setFaceStatus("ok");
            if (noFaceTimerRef.current) clearTimeout(noFaceTimerRef.current);
          } else if (rand < 0.92) {
            setFaceStatus("none");
            noFaceTimerRef.current = setTimeout(() => {
              if (active) onFaceViolation("No face detected for more than 5 seconds. Please ensure your face is visible to the camera.");
            }, 5000);
          } else {
            setFaceStatus("multiple");
            onFaceViolation("Multiple faces detected in the camera frame. Only the registered candidate is allowed in the exam area.");
          }
          setTimeout(simulate, 8000 + Math.random() * 4000);
        };
        setTimeout(simulate, 12000);
      })
      .catch(() => {
        if (active) setCameraError(true);
      });

    return () => {
      active = false;
      if (noFaceTimerRef.current) clearTimeout(noFaceTimerRef.current);
      if (currentStream) currentStream.getTracks().forEach(t => t.stop());
    };
  }, [onFaceViolation]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5" />
          Webcam Feed
        </p>
        <div className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${faceStatus === "ok" ? "bg-success/10 border-success/30 text-success" :
          faceStatus === "none" ? "bg-warning/10 border-warning/30 text-warning" :
            faceStatus === "multiple" ? "bg-danger/10 border-danger/30 text-danger" :
              "bg-muted border-border text-muted-foreground"
          }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${faceStatus === "ok" ? "bg-success animate-pulse" :
            faceStatus === "none" ? "bg-warning animate-pulse" :
              faceStatus === "multiple" ? "bg-danger animate-pulse" :
                "bg-muted-foreground"
            }`} />
          {faceStatus === "ok" ? "Face OK" : faceStatus === "none" ? "No Face" : faceStatus === "multiple" ? "Multi-Face" : "Starting…"}
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden bg-secondary/80 border border-border/50 aspect-video">
        {cameraError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <Camera className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground">Camera unavailable</p>
            <p className="text-[10px] text-muted-foreground/60 mt-1">Allow camera access to continue</p>
          </div>
        ) : (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
        )}

        {/* REC indicator */}
        <div className="absolute top-2 left-2 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
          <span className="text-[10px] text-danger font-bold tracking-wider">REC</span>
        </div>

        {/* AI overlay */}
        {!cameraError && faceStatus === "ok" && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-24 border-2 border-success/50 rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Exam Timer ────────────────────────────────────────────────────────────
function ExamTimer({ seconds }: { seconds: number }) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  const isLow = seconds < 300; // < 5 min

  return (
    <div className={`rounded-xl p-3 text-center border ${isLow ? "border-danger/40 bg-danger/10" : "border-border/50 bg-secondary/50"}`}>
      <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
        <Clock className="w-3 h-3" />
        Time Remaining
      </p>
      <p className={`text-2xl font-mono font-bold ${isLow ? "text-danger animate-blink" : "text-warning"}`}>
        {hrs > 0 ? `${pad(hrs)}:` : ""}{pad(mins)}:{pad(secs)}
      </p>
    </div>
  );
}

// ─── Question Navigator ────────────────────────────────────────────────────
function QuestionNavigator({
  questions,
  currentIndex,
  answers,
  onSelect,
}: {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, { status: string }>;
  onSelect: (i: number) => void;
}) {
  const getStatus = (q: Question) => {
    const ans = answers[q.id];
    if (!ans) return "unanswered";
    return ans.status;
  };

  const statusCls = {
    answered: "bg-success/20 text-success border-success/40 hover:bg-success/30",
    flagged: "bg-warning/20 text-warning border-warning/40 hover:bg-warning/30",
    unanswered: "bg-secondary text-muted-foreground border-border/50 hover:border-border",
  };

  const answered = questions.filter(q => answers[q.id]?.status === "answered").length;
  const flagged = questions.filter(q => answers[q.id]?.status === "flagged").length;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Question Navigator
        </p>
        <div className="grid grid-cols-5 gap-1.5">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => onSelect(i)}
              className={`w-full aspect-square rounded-lg border text-xs font-bold flex items-center justify-center transition-all ${i === currentIndex
                ? "bg-primary text-primary-foreground border-primary shadow-glow-sm ring-1 ring-primary/50"
                : statusCls[getStatus(q) as keyof typeof statusCls] || statusCls.unanswered
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        {[
          { label: "Answered", count: answered, cls: "text-success", dot: "bg-success" },
          { label: "Flagged", count: flagged, cls: "text-warning", dot: "bg-warning" },
          { label: "Unanswered", count: questions.length - answered - flagged, cls: "text-muted-foreground", dot: "bg-muted-foreground" },
        ].map((s) => (
          <div key={s.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${s.dot}`} />
              <span className="text-muted-foreground">{s.label}</span>
            </div>
            <span className={`font-bold ${s.cls}`}>{s.count}</span>
          </div>
        ))}
      </div>

      <Progress value={(answered / questions.length) * 100} className="h-1.5" />
    </div>
  );
}

// ─── Main Exam Interface ───────────────────────────────────────────────────
export default function ExamInterface() {
  const navigate = useNavigate();
  const {
    currentQuestionIndex,
    answers,
    timeRemaining,
    violationCount,
    tabSwitchCount,
    proctorWarningVisible,
    proctorWarningMessage,
    startExam,
    setCurrentQuestion,
    saveAnswer,
    flagQuestion,
    unflagQuestion,
    decrementTimer,
    setFullscreen,
    recordTabSwitch,
    recordFaceViolation,
    dismissProctorWarning,
  } = useExamStore();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [descriptiveAnswer, setDescriptiveAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const questions = mockQuestions;
  const currentQ = questions[currentQuestionIndex];
  const examDuration = 90 * 60;

  // Initialize exam
  useEffect(() => {
    startExam("exam-001", examDuration);
  }, [startExam, examDuration]);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(decrementTimer, 1000);
    return () => clearInterval(interval);
  }, [decrementTimer]);

  // Tab-switch detection (visibilitychange)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordTabSwitch();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [recordTabSwitch]);

  // Fullscreen
  const requestFullscreen = useCallback(async () => {
    try {
      await containerRef.current?.requestFullscreen();
      setIsFullscreenMode(true);
      setFullscreen(true);
    } catch {
      setIsFullscreenMode(true);
    }
  }, [setFullscreen]);

  useEffect(() => {
    const handleFsChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreenMode(false);
        setFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, [setFullscreen]);

  // Sync local state with store answers
  useEffect(() => {
    const ans = answers[currentQ?.id];
    if (currentQ?.type === "mcq") {
      setSelectedOption(ans?.value !== undefined ? Number(ans.value) : null);
    } else {
      setDescriptiveAnswer(ans?.value || "");
    }
  }, [currentQuestionIndex, currentQ, answers]);

  const handleSelectOption = (i: number) => {
    setSelectedOption(i);
    saveAnswer(currentQ.id, String(i));
  };

  const handleDescriptiveChange = (val: string) => {
    setDescriptiveAnswer(val);
    saveAnswer(currentQ.id, val);
  };

  const goNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestion(currentQuestionIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestion(currentQuestionIndex - 1);
    }
  };

  const toggleFlag = () => {
    const ans = answers[currentQ.id];
    if (ans?.status === "flagged") {
      unflagQuestion(currentQ.id);
    } else {
      flagQuestion(currentQ.id);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    navigate("/student");
  };

  const answeredCount = Object.values(answers).filter(a => a.status === "answered").length;
  const isFlagged = answers[currentQ?.id]?.status === "flagged";

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background flex flex-col select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Proctoring violation modal */}
      {proctorWarningVisible && (
        <ViolationModal message={proctorWarningMessage} onDismiss={dismissProctorWarning} />
      )}

      {/* Submit confirmation */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border glass p-6 animate-scale-in">
            <h3 className="font-bold text-lg mb-2">Submit Exam?</h3>
            <p className="text-sm text-muted-foreground mb-1">
              You have answered <strong className="text-foreground">{answeredCount}</strong> of{" "}
              <strong className="text-foreground">{questions.length}</strong> questions.
            </p>
            {questions.length - answeredCount > 0 && (
              <p className="text-xs text-warning mb-4">
                {questions.length - answeredCount} question{questions.length - answeredCount > 1 ? "s" : ""} unanswered.
              </p>
            )}
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1 border-border/60" onClick={() => setShowSubmitConfirm(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 gradient-primary text-primary-foreground"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting…" : "Confirm Submit"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="glass border-b border-border/50 px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 gradient-primary rounded-lg flex items-center justify-center shadow-glow-sm">
            <Shield className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs font-semibold leading-tight">Advanced Data Structures & Algorithms</p>
            <p className="text-[10px] text-muted-foreground">Exam ID: exam-001 · Secure Session</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {violationCount > 0 && (
            <Badge variant="outline" className="border-danger/40 text-danger text-xs gap-1">
              <AlertTriangle className="w-3 h-3" />
              {violationCount} violation{violationCount > 1 ? "s" : ""}
            </Badge>
          )}
          {!isFullscreenMode && (
            <Button size="sm" variant="outline" className="text-xs border-warning/40 text-warning h-7 gap-1" onClick={requestFullscreen}>
              <Maximize className="w-3 h-3" />
              Enter Fullscreen
            </Button>
          )}
          <Button
            size="sm"
            className="gradient-primary text-primary-foreground h-7 text-xs gap-1 shadow-glow-sm"
            onClick={() => setShowSubmitConfirm(true)}
          >
            <Send className="w-3 h-3" />
            Submit
          </Button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — Question Navigator */}
        <div className="w-52 shrink-0 border-r border-border/50 p-4 overflow-y-auto bg-card/30">
          <QuestionNavigator
            questions={questions}
            currentIndex={currentQuestionIndex}
            answers={answers}
            onSelect={setCurrentQuestion}
          />
        </div>

        {/* Center — Question */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            {/* Question header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs border-primary/40 text-primary">
                  {currentQ?.type === "mcq" ? "MCQ" : "Descriptive"}
                </Badge>
                <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground">
                  Q{currentQuestionIndex + 1} of {questions.length}
                </Badge>
                <Badge variant="outline" className="text-xs bg-success/10 border-success/30 text-success">
                  {currentQ?.marks} mark{currentQ?.marks > 1 ? "s" : ""}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={`text-xs gap-1.5 h-8 ${isFlagged ? "text-warning" : "text-muted-foreground hover:text-warning"}`}
                onClick={toggleFlag}
              >
                <Flag className="w-3.5 h-3.5" />
                {isFlagged ? "Flagged" : "Flag for Review"}
              </Button>
            </div>

            {/* Question text */}
            <div className="p-5 rounded-xl bg-card border border-border/50 mb-5">
              <p className="text-base leading-relaxed font-medium">{currentQ?.text}</p>
            </div>

            {/* MCQ options */}
            {currentQ?.type === "mcq" && (
              <div className="space-y-3">
                {currentQ.options?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(i)}
                    className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm transition-all duration-150 ${selectedOption === i
                      ? "border-primary/60 bg-primary/10 text-primary shadow-glow-sm"
                      : "border-border/50 hover:border-border bg-card text-foreground"
                      }`}
                  >
                    <span className="font-mono text-xs opacity-60 mr-3">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Descriptive */}
            {currentQ?.type === "descriptive" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    Write your detailed answer below
                  </span>
                  <span>{descriptiveAnswer.length} chars</span>
                </div>
                <textarea
                  value={descriptiveAnswer}
                  onChange={(e) => handleDescriptiveChange(e.target.value)}
                  placeholder="Begin your answer here. Be thorough and structured in your response..."
                  className="w-full min-h-[260px] px-4 py-3 rounded-xl bg-card border border-border/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none leading-relaxed font-sans"
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={goPrev}
                disabled={currentQuestionIndex === 0}
                className="border-border/60 gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <span className="text-xs text-muted-foreground">
                {currentQuestionIndex + 1} / {questions.length}
              </span>

              {currentQuestionIndex === questions.length - 1 ? (
                <Button
                  className="gradient-primary text-primary-foreground shadow-glow-sm gap-1.5"
                  onClick={() => setShowSubmitConfirm(true)}
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Exam
                </Button>
              ) : (
                <Button
                  onClick={goNext}
                  className="gradient-primary text-primary-foreground shadow-glow-sm gap-1.5"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right — Webcam + Timer + Proctoring stats */}
        <div className="w-60 shrink-0 border-l border-border/50 p-4 space-y-4 overflow-y-auto bg-card/30">
          <ExamTimer seconds={timeRemaining} />

          <WebcamFeed onFaceViolation={recordFaceViolation} />

          <div className="p-3 rounded-xl bg-secondary/50 border border-border/50 space-y-2.5">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              AI Proctoring
            </p>
            {[
              { label: "Tab Switches", value: tabSwitchCount, warn: tabSwitchCount > 0 },
              { label: "Total Violations", value: violationCount, warn: violationCount > 0 },
              { label: "Answered", value: `${answeredCount}/${questions.length}`, warn: false },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{item.label}</span>
                <span className={item.warn ? "text-danger font-bold" : "text-foreground font-medium"}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-primary/5 border border-primary/15 space-y-1.5">
            <p className="text-xs font-medium text-primary flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Secure Session
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <CheckCircle2 className="w-3 h-3 text-success" />
              End-to-end encrypted
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <CheckCircle2 className="w-3 h-3 text-success" />
              Answers auto-saved
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <CheckCircle2 className="w-3 h-3 text-success" />
              Session monitored
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}