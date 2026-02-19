import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password too long"),
});

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Name too long"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address")
      .max(255, "Email too long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password too long")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
    role: z.enum(["student", "teacher"]),
    institution: z.string().trim().max(200, "Institution name too long").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

export const createExamSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(200, "Title too long"),
  subject: z.string().trim().min(2, "Subject required").max(100, "Subject too long"),
  duration: z.number().min(10, "Minimum 10 minutes").max(300, "Maximum 5 hours"),
  totalMarks: z.number().min(10, "Minimum 10 marks").max(1000, "Maximum 1000 marks"),
  questionType: z.enum(["mcq", "descriptive", "mixed"]),
  instructions: z.string().trim().max(2000, "Instructions too long").optional(),
  startTime: z.string().min(1, "Start time required"),
  passingMarks: z.number().min(0, "Cannot be negative"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type CreateExamFormData = z.infer<typeof createExamSchema>;
