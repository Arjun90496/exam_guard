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
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
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
      <section className="pt-32 pb-20 px-6 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left animate-slide-in-right">
            <Badge
              variant="outline"
              className="mb-8 border-primary/30 bg-primary/10 text-primary px-4 py-1.5 text-xs font-bold tracking-wide uppercase"
            >
              <Zap className="w-3 h-3 mr-1.5" />
              AI-Powered Exam Integrity Platform
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-6 text-foreground">
              Proctored Exams.
              <br />
              <span className="text-primary">Zero Compromise.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
              ExamShieldAI delivers military-grade proctoring with real-time face detection, behavioral analysis, and
              AI grading. All in one enterprise-ready platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 h-14 text-base rounded-xl"
                asChild
              >
                <Link to="/student">
                  Start Demo
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-base border-border/60 hover:bg-secondary/10 rounded-xl" asChild>
                <Link to="/teacher">Teacher Dashboard</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> No credit card required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> Free plan available</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> GDPR compliant</span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 relative xl:aspect-video rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1400&auto=format&fit=crop"
              alt="Student taking an online exam"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none"></div>

            {/* Overlay UI element to keep some of the original interactive feel */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-background/90 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Secure Session Active</p>
                  <p className="text-xs text-muted-foreground">AI proctoring and environment monitoring running smoothly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Exam.net style flat row */}
      <section id="stats" className="py-12 border-y border-border/50 bg-secondary/10 relative z-10">
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-wrap justify-between items-center gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-left">
              <p className="text-4xl md:text-5xl font-black text-foreground mb-1">{stat.value}</p>
              <p className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features - Exam.net Alternating Splits & Grids */}
      <section id="features" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto w-full">
          {/* Top Features - Checkmark List style */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tight">
                Everything you need to create and conduct secure exams
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                We simplify all the moving pieces so you can administer your exams securely and with confidence without technical complexity.
              </p>
              <div className="space-y-6">
                {features.slice(0, 3).map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Visual Image Right Side */}
            <div className="bg-secondary/10 rounded-2xl border border-border/50 aspect-square flex items-center justify-center p-8 relative overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
                alt="Students studying online"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent pointer-events-none" />
              <div className="text-center relative z-10 bg-background/90 backdrop-blur-md p-8 rounded-2xl border border-border/50 shadow-lg">
                <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="font-bold text-lg text-foreground">Military-Grade Security</p>
              </div>
            </div>
          </div>

          {/* Bottom Features - Grid style */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-foreground">Just a few ways you can use ExamShieldAI</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.slice(3).map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl bg-secondary/5 border border-transparent hover:border-border/50 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-background border border-border/50 flex items-center justify-center mb-6 shadow-sm group-hover:-translate-y-1 transition-transform`}>
                  <feature.icon className={`w-6 h-6 text-foreground`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Exam.net style flat wide sections */}
      <section id="pricing" className="py-24 px-6 bg-secondary/5 border-y border-border/30">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-foreground">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground text-xl">No hidden fees. Scale as you grow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 border transition-all duration-300 ${plan.highlight
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

      {/* Final CTA - Exam.net Checklist Box Style */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto w-full">
          <div className="p-12 md:p-16 rounded-3xl bg-secondary/10 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8 text-foreground leading-[1.1]">
                  Create and conduct your first exam in less than an hour
                </h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-lg font-medium text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    Without talking to a salesperson
                  </li>
                  <li className="flex items-center gap-3 text-lg font-medium text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    Without putting a credit card on file
                  </li>
                  <li className="flex items-center gap-3 text-lg font-medium text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    Without technical integrations
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-6 justify-center items-center text-center p-8 bg-background rounded-2xl border border-border shadow-sm">
                <p className="text-xl font-bold text-foreground">Try ExamShieldAI today</p>
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 h-14 rounded-xl text-lg" asChild>
                  <Link to="/signup">Start your free trial</Link>
                </Button>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>30-day free trial.</p>
                  <p>No credit card required.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-foreground text-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 gradient-primary rounded flex items-center justify-center">
              <Shield className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm">ExamShieldAI</span>
          </div>
          <p className="text-sm text-muted">
            © 2026 ExamShieldAI. Enterprise exam integrity platform. GDPR · SOC 2 · ISO 27001 compliant.
          </p>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}