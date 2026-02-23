import { useState, useEffect } from "react";
import { Users, FileText, CreditCard, Activity, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { api } from "@/lib/client";
import { toast } from "sonner";

interface DashboardStats {
    users: { total: number; teachers: number; students: number };
    exams: { total: number; active: number };
    attempts: number;
    revenue: number;
}

const AdminDashboard = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.getAdminStats();
                setStats(response.data);
            } catch (error) {
                console.error("Failed to load admin stats:", error);
                toast.error("Failed to load dashboard statistics");
                // Provide fallback data for visualization before backend is fully wired
                setStats({
                    users: { total: 1250, teachers: 45, students: 1205 },
                    exams: { total: 84, active: 12 },
                    attempts: 5430,
                    revenue: 12450
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (isLoading || !stats) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[60vh]">
                <div className="animate-pulse space-y-4 text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-muted-foreground">Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    const statCards = [
        {
            title: "Total Users",
            value: stats.users.total.toLocaleString(),
            description: `${stats.users.teachers} teachers, ${stats.users.students} students`,
            icon: Users,
            trend: "+12% from last month",
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            title: "Active Exams",
            value: stats.exams.active.toLocaleString(),
            description: `Out of ${stats.exams.total} total exams created`,
            icon: FileText,
            trend: "+4 active today",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
        {
            title: "Total Attempts",
            value: stats.attempts.toLocaleString(),
            description: "Exam attempts submitted",
            icon: Activity,
            trend: "+834 this week",
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
        {
            title: "Total Revenue",
            value: `$${stats.revenue.toLocaleString()}`,
            description: "Platform subscription revenue",
            icon: CreditCard,
            trend: "+24% from last month",
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto animate-fade-in space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
                    <p className="text-muted-foreground mt-1">Monitor platform activity and key metrics.</p>
                </div>
                <Badge variant="outline" className="px-3 py-1 bg-success/10 text-success border-success/20">
                    <span className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
                    System Operational
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <Card key={i} className="border-border/50 glass hover:border-primary/20 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 shrink-0">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mb-4">
                                {stat.description}
                            </p>
                            <div className="flex items-center text-xs text-success bg-success/10 w-fit px-2 py-1 rounded-md">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {stat.trend}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Placeholder for future charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-2 border-border/50 glass">
                    <CardHeader>
                        <CardTitle>Exam Activity</CardTitle>
                        <CardDescription>Attempts and completions over the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center bg-secondary/20 rounded-lg mx-6 mb-6 border border-dashed border-border/50">
                        <p className="text-muted-foreground text-sm flex items-center gap-2">
                            <Activity className="w-4 h-4" /> Activity Chart Module
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border/50 glass flex flex-col">
                    <CardHeader>
                        <CardTitle>Recent Systems Alerts</CardTitle>
                        <CardDescription>Proctoring anomalies and load spikes</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="space-y-4">
                            {[
                                { time: "10 mins ago", text: "High facial mismatch threshold triggered in Exam #84", status: "warning" },
                                { time: "2 hours ago", text: "Database query optimization successful", status: "success" },
                                { time: "5 hours ago", text: "New institution registered: Central Tech University", status: "info" }
                            ].map((alert, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm">
                                    <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${alert.status === 'warning' ? 'bg-warning' :
                                        alert.status === 'success' ? 'bg-success' : 'bg-primary'
                                        }`} />
                                    <div>
                                        <p className="text-foreground leading-snug">{alert.text}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
