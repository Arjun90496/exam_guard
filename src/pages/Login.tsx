import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormData } from "@/lib/schemas";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    // Mock: redirect based on email
    if (data.email.includes("teacher") || data.email.includes("admin")) {
      navigate("/teacher");
    } else {
      navigate("/student");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen gradient-hero flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-border/30">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-glow-sm">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            ExamShield<span className="text-gradient">AI</span>
          </span>
        </Link>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-success/10 border border-success/20 rounded-full px-4 py-2 text-sm text-success">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            5,000 concurrent users supported
          </div>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
            Secure. Intelligent.
            <br />
            <span className="text-gradient">Uncompromising.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
            Join thousands of institutions running fair, AI-monitored exams with real-time proctoring.
          </p>

          <div className="space-y-3">
            {[
              "Real-time face detection with TensorFlow.js",
              "Tab-switch & copy-paste prevention",
              "AI-graded results in seconds",
              "Encrypted exam sessions",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          © 2026 ExamShieldAI · SOC 2 Type II · GDPR Compliant
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          <div className="lg:hidden flex items-center gap-2.5 mb-10 justify-center">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-glow-sm">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">ExamShieldAI</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              {errors.email && (
                <p className="text-xs text-danger">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <a href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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
              {errors.password && (
                <p className="text-xs text-danger">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 gradient-primary text-primary-foreground font-semibold shadow-glow-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs text-muted-foreground">
              <span className="bg-background px-3">or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-4 h-11 border-border/60 hover:bg-secondary gap-2"
            onClick={() => navigate("/otp-verify")}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Gmail OTP
          </Button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Create account
            </Link>
          </p>

          {/* Demo hint */}
          <div className="mt-6 p-3 rounded-lg bg-secondary/50 border border-border/50 text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground/70">Demo accounts:</p>
            <p>Student: <span className="font-mono text-primary">student@demo.com</span></p>
            <p>Teacher: <span className="font-mono text-primary">teacher@demo.com</span></p>
            <p>Any password with 8+ chars works</p>
          </div>
        </div>
      </div>
    </div>
  );
}
