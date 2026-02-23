import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    FileText,
    Clock,
    Video,
    AlertCircle
} from "lucide-react";
import { api } from "@/lib/client";
import { toast } from "sonner";

interface Exam {
    id: string;
    title: string;
    duration_minutes: number;
    status: string;
    proctoring_enabled: boolean;
    teacher: {
        name: string;
        email: string;
    };
    attempts_count: number;
    created_at: string;
}

const AdminExams = () => {
    const [exams, setExams] = useState<Exam[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        setIsLoading(true);
        try {
            const response = await api.getAdminExams();
            setExams(response.data.data.data);
        } catch (error) {
            console.error("Failed to load exams:", error);
            toast.error("Failed to load exams from backend");

            // Fallback data
            setExams([
                {
                    id: "EX-884A2", title: "Midterm Computer Science 101", duration_minutes: 120, status: "published",
                    proctoring_enabled: true, attempts_count: 45, created_at: "2026-02-18T10:00:00Z",
                    teacher: { name: "Professor Smith", email: "smith@university.edu" }
                },
                {
                    id: "EX-9B31C", title: "Data Structures Quiz 3", duration_minutes: 45, status: "draft",
                    proctoring_enabled: false, attempts_count: 0, created_at: "2026-02-20T14:30:00Z",
                    teacher: { name: "Alan Turing", email: "alan@university.edu" }
                },
                {
                    id: "EX-1120F", title: "Final Advanced Web Dev", duration_minutes: 180, status: "completed",
                    proctoring_enabled: true, attempts_count: 128, created_at: "2026-01-05T09:00:00Z",
                    teacher: { name: "Ada Lovelace", email: "ada@tech.edu" }
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Platform Exams</h1>
                <p className="text-muted-foreground mt-1">Monitor all exams running on ExamShieldAI.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-xl border border-border/50 bg-card/50 p-6 glass flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Exams</p>
                        <p className="text-2xl font-bold">{exams.length}</p>
                    </div>
                </div>

                <div className="rounded-xl border border-border/50 bg-card/50 p-6 glass flex items-center gap-4">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-success" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                        <p className="text-2xl font-bold">{exams.filter(e => e.status === 'published').length}</p>
                    </div>
                </div>

                <div className="rounded-xl border border-warning/30 bg-warning/5 p-6 glass flex items-center gap-4 border-dashed relative overflow-hidden group">
                    <div className="absolute inset-0 bg-warning/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                    <div className="w-12 h-12 bg-warning/20 border border-warning/40 rounded-full flex items-center justify-center">
                        <Video className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Live Proctoring Load</p>
                        <p className="text-2xl font-bold text-warning">Medium</p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden glass">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-border/50 bg-secondary/30">
                            <TableHead>Exam ID & Title</TableHead>
                            <TableHead>Teacher</TableHead>
                            <TableHead>Settings</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Attempts</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    Loading exams...
                                </TableCell>
                            </TableRow>
                        ) : exams.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                                    No exams created on the platform yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            exams.map((exam) => (
                                <TableRow key={exam.id} className="border-border/20 hover:bg-secondary/10 transition-colors">
                                    <TableCell>
                                        <div className="font-mono text-xs text-primary mb-1 tracking-wider">{exam.id}</div>
                                        <div className="font-medium truncate max-w-[250px]" title={exam.title}>{exam.title}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">{exam.teacher.name}</div>
                                        <div className="text-xs text-muted-foreground">{exam.teacher.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <Clock className="w-3.5 h-3.5 mr-1.5" /> {exam.duration_minutes} mins
                                            </div>
                                            {exam.proctoring_enabled && (
                                                <div className="flex items-center text-xs text-accent">
                                                    <Video className="w-3.5 h-3.5 mr-1.5" /> AI Proctored
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`capitalize text-xs ${exam.status === 'published' ? 'border-success/50 text-success bg-success/10' :
                                            exam.status === 'completed' ? 'border-muted-foreground/50 text-muted-foreground' :
                                                'border-warning/50 text-warning bg-warning/10'
                                            }`}>
                                            {exam.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-mono font-medium">
                                        {exam.attempts_count}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminExams;
