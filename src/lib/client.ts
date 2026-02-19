import axios from "axios";

const BASE_URL = "https://api.examshieldai.com/v1"; // Mock base

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — attach auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("exam_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401s
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("exam_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ─── API methods (use mock data in dev) ────────────────────────────────────

export const api = {
  getExams: () => apiClient.get("/exams"),
  getExam: (id: string) => apiClient.get(`/exams/${id}`),
  verifyOtp: (email: string, otp: string) =>
    apiClient.post("/verify-otp", { email, otp }),
  submitAnswer: (examId: string, questionId: string, answer: string) =>
    apiClient.post("/submit-answer", { examId, questionId, answer }),
  submitExam: (examId: string, answers: Record<string, string>) =>
    apiClient.post(`/exams/${examId}/submit`, { answers }),
  reportViolation: (examId: string, type: string, snapshot?: string) =>
    apiClient.post("/violations", { examId, type, snapshot }),
  createExam: (data: unknown) => apiClient.post("/exams", data),
  getResults: () => apiClient.get("/results"),
  getStudents: (examId: string) => apiClient.get(`/exams/${examId}/students`),
};
