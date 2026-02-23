import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield, Mail, Lock, Eye, EyeOff, User, ArrowRight, Loader2, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupSchema, otpSchema, type SignupFormData, type OtpFormData } from "@/lib/schemas";

type Step = "form" | "otp";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher">("student");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: "student" },
  });

  const {
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm<OtpFormData>({ resolver: zodResolver(otpSchema) });

  const onSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setPendingEmail(data.email);
    setStep("otp");
    setIsLoading(false);
  };

  const onVerifyOtp = async () => {
    const otp = otpDigits.join("");
    if (otp.length < 6) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    navigate(selectedRole === "teacher" ? "/teacher" : "/student");
    setIsLoading(false);
  };

  const handleOtpInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  if (step === "otp") {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-scale-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-glow">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Check your email</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We sent a 6-digit OTP to{" "}
              <span className="text-foreground font-medium">{pendingEmail}</span>
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium block mb-3 text-center">Enter verification code</Label>
              <div className="flex gap-2.5 justify-center">
                {otpDigits.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpInput(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`w-12 h-14 text-center text-xl font-bold rounded-xl border bg-secondary/50 transition-all
                      focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
                      ${digit ? "border-primary/50 text-primary" : "border-border/60 text-foreground"}`}
                  />
                ))}
              </div>
              {otpDigits.join("").length < 6 && otpDigits.join("").length > 0 && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {6 - otpDigits.join("").length} digits remaining
                </p>
              )}
            </div>

            <Button
              onClick={onVerifyOtp}
              className="w-full h-11 gradient-primary text-primary-foreground font-semibold shadow-glow-sm"
              disabled={isLoading || otpDigits.join("").length < 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying…
                </>
              ) : (
                <>
                  Verify & Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">
                Didn't receive the code?{" "}
                <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Resend OTP
                </button>
              </p>
              <button
                onClick={() => setStep("form")}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to signup
              </button>
            </div>

            {/* Demo hint */}
            <div className="p-3 rounded-lg bg-secondary/50 border border-border/50 text-xs text-center text-muted-foreground">
              Demo: Enter any 6 digits (e.g. <span className="font-mono text-primary">123456</span>) to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-8">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 justify-center mb-6">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-glow-sm">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              ExamShield<span className="text-gradient">AI</span>
            </span>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Create your account</h1>
          <p className="text-muted-foreground text-sm">Join thousands of students and educators</p>
        </div>

        {/* Role selector */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-secondary/50 border border-border/50 mb-6">
          {(["student", "teacher"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${
                selectedRole === role
                  ? "bg-primary text-primary-foreground shadow-glow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {role === "student" ? "👨‍🎓 " : "👩‍🏫 "}{role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSignup)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">Full name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="fullName"
                placeholder="Jane Smith"
                className="pl-10 bg-secondary/50 border-border/60 focus:border-primary/50 h-11"
                {...register("fullName")}
              />
            </div>
            {errors.fullName && <p className="text-xs text-danger">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                placeholder="you@institution.edu"
                className="pl-10 bg-secondary/50 border-border/60 focus:border-primary/50 h-11"
                {...register("email")}
              />
            </div>
            {errors.email && <p className="text-xs text-danger">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="institution" className="text-sm font-medium">
              Institution <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="institution"
                placeholder="MIT, IIT, etc."
                className="pl-10 bg-secondary/50 border-border/60 focus:border-primary/50 h-11"
                {...register("institution")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 chars"
                  className="pl-10 pr-10 bg-secondary/50 border-border/60 focus:border-primary/50 h-11"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-danger">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat"
                  className="pl-10 bg-secondary/50 border-border/60 focus:border-primary/50 h-11"
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-danger">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Hidden role field */}
          <input type="hidden" value={selectedRole} {...register("role")} />

          <Button
            type="submit"
            className="w-full h-11 gradient-primary text-primary-foreground font-semibold shadow-glow-sm mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending OTP…
              </>
            ) : (
              <>
                Continue with Gmail OTP
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Sign in
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-primary/70 hover:text-primary">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="text-primary/70 hover:text-primary">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
