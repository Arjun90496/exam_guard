import { Link } from "react-router-dom";
import { Shield, Brain, Eye, Lock, ChevronRight, CheckCircle2, Zap, Users, Award, Globe, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Grading",
    description: "Instant, unbiased scoring for both MCQ and descriptive answers with detailed feedback and rubric alignment.",
    badge: "ML Model",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Eye,
    title: "Real-Time Proctoring",
    description: "Face detection, tab-switch monitoring, and environment analysis running at 30fps to ensure exam integrity.",
    badge: "TensorFlow",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Shield,
    title: "Tamper-Proof Security",
    description: "Fullscreen lock, copy-paste prevention, and encrypted answer transmission with end-to-end verification.",
    badge: "Zero-Trust",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: Globe,
    title: "Scalable Infrastructure",
    description: "Built to handle 5,000+ concurrent exam sessions with <50ms latency across global regions.",
    badge: "5K Users",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "AI analyzes and delivers comprehensive performance reports seconds after exam submission.",
    badge: "Real-time",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Award,
    title: "Verified Certificates",
    description: "Blockchain-anchored certificates that employers can verify instantly via unique QR codes.",
    badge: "Blockchain",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: 0,
    description: "For individuals and small cohorts",
    features: ["Up to 30 students", "5 exams/month", "Basic AI grading", "Standard proctoring", "Email support"],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Professional",
    price: 49,
    description: "For institutions and academies",
    features: ["Up to 500 students", "Unlimited exams", "Advanced AI feedback", "Full proctoring suite", "Custom branding", "Priority support", "Analytics dashboard"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: null,
    description: "For universities and corporations",
    features: ["Unlimited students", "SSO & LMS integration", "White-label platform", "Dedicated infrastructure", "SLA guarantee", "24/7 dedicated support", "Custom AI models"],
    cta: "Contact Sales",
    highlight: false,
  },
];

const stats = [
  { value: "50K+", label: "Exams Conducted" },
  { value: "99.8%", label: "Uptime SLA" },
  { value: "5,000", label: "Concurrent Users" },
  { value: "< 50ms", label: "Global Latency" },
];

export default function Index() {
  return (
    <div className="min-h-screen gradient-hero">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-glow-sm">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              ExamShield<span className="text-gradient">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#stats" className="hover:text-foreground transition-colors">About</a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button size="sm" className="gradient-primary text-primary-foreground shadow-glow-sm font-medium" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <Badge
            variant="outline"
            className="mb-6 border-primary/30 bg-primary/10 text-primary px-4 py-1.5 text-xs font-medium tracking-wide uppercase"
          >
            <Zap className="w-3 h-3 mr-1.5" />
            AI-Powered Exam Integrity Platform
          </Badge>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
            Proctored Exams.
            <br />
            <span className="text-gradient">Zero Compromise.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            ExamShieldAI delivers military-grade proctoring with real-time face detection, behavioral analysis, and
            AI grading — all in one enterprise-ready platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground shadow-glow font-semibold px-8 h-12 text-base"
              asChild
            >
              <Link to="/student">
                Start Demo
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base border-border/60 hover:bg-secondary" asChild>
              <Link to="/teacher">Teacher Dashboard</Link>
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span>No credit card required</span>
            <span className="mx-2">·</span>
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span>Free plan available</span>
            <span className="mx-2">·</span>
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span>GDPR compliant</span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="rounded-2xl border border-border/50 overflow-hidden shadow-2xl glass">
            <div className="bg-secondary/50 px-4 py-3 flex items-center gap-2 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-danger/70" />
                <div className="w-3 h-3 rounded-full bg-warning/70" />
                <div className="w-3 h-3 rounded-full bg-success/70" />
              </div>
              <div className="flex-1 mx-4 bg-background/50 rounded-md px-3 py-1 text-xs text-muted-foreground font-mono text-center">
                examshieldai.com/exam/live
              </div>
              <div className="flex items-center gap-1.5 text-xs text-success">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Secure Session
              </div>
            </div>
            <div className="p-6 grid grid-cols-12 gap-4 min-h-[340px]">
              {/* Question navigator mock */}
              <div className="col-span-2 space-y-2">
                <p className="text-xs text-muted-foreground font-medium mb-3">Questions</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded text-[9px] font-bold flex items-center justify-center ${
                        i < 5 ? "bg-success/20 text-success border border-success/30" :
                        i === 5 ? "bg-primary text-primary-foreground" :
                        i === 8 || i === 12 ? "bg-warning/20 text-warning border border-warning/30" :
                        "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main question area mock */}
              <div className="col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">MCQ</Badge>
                  <Badge variant="outline" className="text-xs">Q6 of 40</Badge>
                  <Badge className="text-xs bg-success/20 text-success border-0 ml-auto">2 marks</Badge>
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  What is the time complexity of searching in a balanced Binary Search Tree (BST)?
                </p>
                <div className="space-y-2">
                  {["O(1)", "O(log n)", "O(n)", "O(n log n)"].map((opt, i) => (
                    <div
                      key={i}
                      className={`px-4 py-2.5 rounded-lg border text-sm cursor-pointer transition-colors ${
                        i === 1
                          ? "border-primary/50 bg-primary/10 text-primary"
                          : "border-border/50 hover:border-border text-muted-foreground"
                      }`}
                    >
                      <span className="font-mono text-xs mr-2 opacity-60">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              {/* Webcam + timer mock */}
              <div className="col-span-3 space-y-3">
                <div className="relative rounded-xl overflow-hidden bg-secondary/80 aspect-video">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/40 mx-auto mb-1 flex items-center justify-center">
                        <Eye className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-[9px] text-muted-foreground">Webcam Active</p>
                    </div>
                  </div>
                  <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
                    <span className="text-[9px] text-danger font-medium">REC</span>
                  </div>
                  <div className="absolute top-1.5 right-1.5 bg-success/20 border border-success/30 text-success rounded px-1 py-0.5 text-[8px]">
                    ✓ Face OK
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-xl p-3 text-center border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Time Remaining</p>
                  <p className="text-2xl font-mono font-bold text-warning">01:22:45</p>
                </div>

                <div className="bg-secondary/50 rounded-xl p-3 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">AI Proctoring</p>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Tab switches</span>
                      <span className="text-success font-medium">0</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Face detected</span>
                      <span className="text-success font-medium">✓</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Violations</span>
                      <span className="text-success font-medium">0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 border-y border-border/30">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-accent/30 bg-accent/10 text-accent text-xs uppercase tracking-wide">
              Platform Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Everything you need for{" "}
              <span className="text-gradient">exam integrity</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Purpose-built for modern education with AI at its core
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-border/50 gradient-card hover:border-border transition-all duration-300 hover:shadow-card"
              >
                <div className={`w-11 h-11 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <Badge variant="outline" className="text-[10px] ml-2 shrink-0 border-border/50 text-muted-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/10 text-primary text-xs uppercase tracking-wide">
              Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Simple, transparent <span className="text-gradient">pricing</span>
            </h2>
            <p className="text-muted-foreground text-lg">No hidden fees. Scale as you grow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 border transition-all duration-300 ${
                  plan.highlight
                    ? "border-primary/50 bg-primary/5 shadow-glow relative"
                    : "border-border/50 gradient-card"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="gradient-primary text-primary-foreground text-xs px-3">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    {plan.price === null ? (
                      <span className="text-3xl font-extrabold">Custom</span>
                    ) : (
                      <>
                        <span className="text-3xl font-extrabold">${plan.price}</span>
                        {plan.price > 0 && <span className="text-muted-foreground text-sm">/month</span>}
                      </>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.highlight ? "gradient-primary text-primary-foreground shadow-glow-sm" : ""}`}
                  variant={plan.highlight ? "default" : "outline"}
                  asChild
                >
                  <Link to="/signup">{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl border border-primary/20 bg-primary/5 shadow-glow">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Ready to <span className="text-gradient">shield your exams?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join 500+ institutions running secure, AI-graded exams with ExamShieldAI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-glow font-semibold px-10 h-12" asChild>
                <Link to="/signup">Create Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-10 border-border/60" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 gradient-primary rounded flex items-center justify-center">
              <Shield className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm">ExamShieldAI</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 ExamShieldAI. Enterprise exam integrity platform. GDPR · SOC 2 · ISO 27001 compliant.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
