export type ExamStatus = "active" | "upcoming" | "completed" | "locked";
export type StudentStatus = "online" | "warning" | "flagged" | "offline";
export type QuestionType = "mcq" | "descriptive";

export interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number; // minutes
  totalMarks: number;
  status: ExamStatus;
  startTime: string;
  endTime: string;
  price?: number;
  questionsCount: number;
}

export interface Question {
  id: string;
  examId: string;
  index: number;
  type: QuestionType;
  text: string;
  options?: string[];
  correctOption?: number;
  marks: number;
}

export interface Result {
  id: string;
  examId: string;
  examTitle: string;
  score: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  completedAt: string;
  aiFeedback: string;
  violations: number;
}

export interface MonitorStudent {
  id: string;
  name: string;
  avatar: string;
  status: StudentStatus;
  progress: number;
  violations: number;
  lastSeen: string;
  flagReason?: string;
}

export const mockExams: Exam[] = [
  {
    id: "exam-001",
    title: "Advanced Data Structures & Algorithms",
    subject: "Computer Science",
    duration: 90,
    totalMarks: 100,
    status: "active",
    startTime: "2026-02-19T10:00:00Z",
    endTime: "2026-02-19T11:30:00Z",
    questionsCount: 40,
  },
  {
    id: "exam-002",
    title: "Machine Learning Fundamentals",
    subject: "AI/ML",
    duration: 120,
    totalMarks: 150,
    status: "upcoming",
    startTime: "2026-02-20T14:00:00Z",
    endTime: "2026-02-20T16:00:00Z",
    price: 29.99,
    questionsCount: 50,
  },
  {
    id: "exam-003",
    title: "Cloud Architecture Certification",
    subject: "Cloud Computing",
    duration: 180,
    totalMarks: 200,
    status: "locked",
    startTime: "2026-02-22T09:00:00Z",
    endTime: "2026-02-22T12:00:00Z",
    price: 49.99,
    questionsCount: 75,
  },
  {
    id: "exam-004",
    title: "Database Design & SQL",
    subject: "Databases",
    duration: 60,
    totalMarks: 80,
    status: "completed",
    startTime: "2026-02-15T11:00:00Z",
    endTime: "2026-02-15T12:00:00Z",
    questionsCount: 30,
  },
];

export const mockQuestions: Question[] = [
  {
    id: "q-001",
    examId: "exam-001",
    index: 1,
    type: "mcq",
    text: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctOption: 1,
    marks: 2,
  },
  {
    id: "q-002",
    examId: "exam-001",
    index: 2,
    type: "mcq",
    text: "Which data structure is used in Breadth-First Search (BFS)?",
    options: ["Stack", "Queue", "Heap", "Linked List"],
    correctOption: 1,
    marks: 2,
  },
  {
    id: "q-003",
    examId: "exam-001",
    index: 3,
    type: "descriptive",
    text: "Explain the concept of Dynamic Programming and provide an example of a problem that can be solved using this technique. Discuss the time and space complexity of your solution.",
    marks: 10,
  },
  {
    id: "q-004",
    examId: "exam-001",
    index: 4,
    type: "mcq",
    text: "What is the worst-case time complexity of QuickSort?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correctOption: 1,
    marks: 2,
  },
  {
    id: "q-005",
    examId: "exam-001",
    index: 5,
    type: "mcq",
    text: "Which of the following is NOT a property of a Red-Black Tree?",
    options: [
      "Every node is either red or black",
      "The root is always black",
      "All leaves are black",
      "Every red node must have two black children",
    ],
    correctOption: 3,
    marks: 2,
  },
  {
    id: "q-006",
    examId: "exam-001",
    index: 6,
    type: "descriptive",
    text: "Compare and contrast Dijkstra's algorithm with the Bellman-Ford algorithm for finding shortest paths in a graph. When would you choose one over the other?",
    marks: 8,
  },
  {
    id: "q-007",
    examId: "exam-001",
    index: 7,
    type: "mcq",
    text: "What is the space complexity of a recursive Fibonacci implementation without memoization?",
    options: ["O(1)", "O(n)", "O(2^n)", "O(log n)"],
    correctOption: 1,
    marks: 2,
  },
  {
    id: "q-008",
    examId: "exam-001",
    index: 8,
    type: "mcq",
    text: "In a min-heap, the minimum element is always at the:",
    options: ["Last index", "Root", "Middle", "Random position"],
    correctOption: 1,
    marks: 2,
  },
];

export const mockResults: Result[] = [
  {
    id: "res-001",
    examId: "exam-004",
    examTitle: "Database Design & SQL",
    score: 72,
    totalMarks: 80,
    percentage: 90,
    grade: "A",
    completedAt: "2026-02-15T12:45:00Z",
    aiFeedback:
      "Excellent performance on normalization concepts. Minor gaps in query optimization — review indexing strategies for large datasets. Strong understanding of ACID properties.",
    violations: 0,
  },
  {
    id: "res-002",
    examId: "exam-005",
    examTitle: "Operating Systems Concepts",
    score: 58,
    totalMarks: 100,
    percentage: 58,
    grade: "C+",
    completedAt: "2026-02-10T15:30:00Z",
    aiFeedback:
      "Good grasp of process scheduling algorithms. Need improvement on memory management and virtual memory concepts. 2 tab-switch violations recorded — avoid this in future exams.",
    violations: 2,
  },
  {
    id: "res-003",
    examId: "exam-006",
    examTitle: "Computer Networks Fundamentals",
    score: 88,
    totalMarks: 100,
    percentage: 88,
    grade: "A",
    completedAt: "2026-02-05T11:00:00Z",
    aiFeedback:
      "Outstanding knowledge of TCP/IP stack and routing protocols. Descriptive answers on OSI model were particularly well-structured and comprehensive.",
    violations: 0,
  },
];

export const mockMonitorStudents: MonitorStudent[] = [
  {
    id: "s-001",
    name: "Alex Chen",
    avatar: "AC",
    status: "online",
    progress: 68,
    violations: 0,
    lastSeen: "Just now",
  },
  {
    id: "s-002",
    name: "Maria Santos",
    avatar: "MS",
    status: "warning",
    progress: 45,
    violations: 1,
    lastSeen: "30s ago",
    flagReason: "Multiple faces detected",
  },
  {
    id: "s-003",
    name: "James Wilson",
    avatar: "JW",
    status: "flagged",
    progress: 32,
    violations: 3,
    lastSeen: "2m ago",
    flagReason: "Tab switched 3 times + face not visible",
  },
  {
    id: "s-004",
    name: "Priya Patel",
    avatar: "PP",
    status: "online",
    progress: 90,
    violations: 0,
    lastSeen: "Just now",
  },
  {
    id: "s-005",
    name: "Lucas Müller",
    avatar: "LM",
    status: "online",
    progress: 55,
    violations: 0,
    lastSeen: "15s ago",
  },
  {
    id: "s-006",
    name: "Yuki Tanaka",
    avatar: "YT",
    status: "warning",
    progress: 70,
    violations: 2,
    lastSeen: "45s ago",
    flagReason: "No face detected for 8 seconds",
  },
  {
    id: "s-007",
    name: "Fatima Al-Hassan",
    avatar: "FA",
    status: "online",
    progress: 82,
    violations: 0,
    lastSeen: "Just now",
  },
  {
    id: "s-008",
    name: "Omar Khalid",
    avatar: "OK",
    status: "offline",
    progress: 20,
    violations: 0,
    lastSeen: "5m ago",
  },
];

export const mockOtpResponse = {
  success: true,
  message: "OTP verified successfully",
  token: "mock_jwt_token_12345",
  user: {
    id: "usr-001",
    name: "Demo User",
    email: "demo@examshieldai.com",
    role: "student",
  },
};
