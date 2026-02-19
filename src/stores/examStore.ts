import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AnswerStatus = "answered" | "unanswered" | "flagged";

interface Answer {
  questionId: string;
  value: string;
  status: AnswerStatus;
  timestamp: number;
}

interface ExamState {
  // Active exam
  activeExamId: string | null;
  currentQuestionIndex: number;
  answers: Record<string, Answer>;
  timeRemaining: number; // seconds
  isFullscreen: boolean;

  // Proctoring
  violationCount: number;
  faceViolations: number;
  tabSwitchCount: number;
  lastViolationTime: number | null;
  proctorWarningVisible: boolean;
  proctorWarningMessage: string;

  // Actions
  startExam: (examId: string, durationSeconds: number) => void;
  setCurrentQuestion: (index: number) => void;
  saveAnswer: (questionId: string, value: string) => void;
  flagQuestion: (questionId: string) => void;
  unflagQuestion: (questionId: string) => void;
  decrementTimer: () => void;
  setFullscreen: (val: boolean) => void;

  // Proctoring actions
  recordTabSwitch: () => void;
  recordFaceViolation: (reason: string) => void;
  dismissProctorWarning: () => void;
  resetExam: () => void;
}

export const useExamStore = create<ExamState>()(
  persist(
    (set, get) => ({
      activeExamId: null,
      currentQuestionIndex: 0,
      answers: {},
      timeRemaining: 0,
      isFullscreen: false,
      violationCount: 0,
      faceViolations: 0,
      tabSwitchCount: 0,
      lastViolationTime: null,
      proctorWarningVisible: false,
      proctorWarningMessage: "",

      startExam: (examId, durationSeconds) =>
        set({
          activeExamId: examId,
          currentQuestionIndex: 0,
          answers: {},
          timeRemaining: durationSeconds,
          violationCount: 0,
          faceViolations: 0,
          tabSwitchCount: 0,
          proctorWarningVisible: false,
        }),

      setCurrentQuestion: (index) =>
        set({ currentQuestionIndex: index }),

      saveAnswer: (questionId, value) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: {
              questionId,
              value,
              status: "answered",
              timestamp: Date.now(),
            },
          },
        })),

      flagQuestion: (questionId) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: {
              ...(state.answers[questionId] || {
                questionId,
                value: "",
                timestamp: Date.now(),
              }),
              status: "flagged",
            },
          },
        })),

      unflagQuestion: (questionId) =>
        set((state) => {
          const existing = state.answers[questionId];
          if (!existing) return state;
          return {
            answers: {
              ...state.answers,
              [questionId]: {
                ...existing,
                status: existing.value ? "answered" : "unanswered",
              },
            },
          };
        }),

      decrementTimer: () =>
        set((state) => ({
          timeRemaining: Math.max(0, state.timeRemaining - 1),
        })),

      setFullscreen: (val) => set({ isFullscreen: val }),

      recordTabSwitch: () =>
        set((state) => ({
          tabSwitchCount: state.tabSwitchCount + 1,
          violationCount: state.violationCount + 1,
          lastViolationTime: Date.now(),
          proctorWarningVisible: true,
          proctorWarningMessage: `Tab switch detected! This is violation #${state.tabSwitchCount + 1}. Repeated violations may result in exam termination.`,
        })),

      recordFaceViolation: (reason) =>
        set((state) => ({
          faceViolations: state.faceViolations + 1,
          violationCount: state.violationCount + 1,
          lastViolationTime: Date.now(),
          proctorWarningVisible: true,
          proctorWarningMessage: reason,
        })),

      dismissProctorWarning: () =>
        set({ proctorWarningVisible: false }),

      resetExam: () =>
        set({
          activeExamId: null,
          currentQuestionIndex: 0,
          answers: {},
          timeRemaining: 0,
          isFullscreen: false,
          violationCount: 0,
          faceViolations: 0,
          tabSwitchCount: 0,
          proctorWarningVisible: false,
        }),
    }),
    {
      name: "examshield-exam-state",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activeExamId: state.activeExamId,
        currentQuestionIndex: state.currentQuestionIndex,
        answers: state.answers,
        timeRemaining: state.timeRemaining,
        violationCount: state.violationCount,
        faceViolations: state.faceViolations,
        tabSwitchCount: state.tabSwitchCount,
      }),
    }
  )
);
