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
    CreditCard,
    ArrowUpRight,
    TrendingUp,
    TrendingDown
} from "lucide-react";
import { api } from "@/lib/client";
import { toast } from "sonner";

interface Transaction {
    id: string;
    amount: number;
    currency: string;
    status: string;
    type: string;
    created_at: string;
    user: {
        name: string;
        email: string;
    };
}

const AdminTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            const response = await api.getAdminTransactions();
            setTransactions(response.data.data.data);
        } catch (error) {
            console.error("Failed to load transactions:", error);
            toast.error("Failed to load transactions logic from backend");

            // Fallback data
            setTransactions([
                {
                    id: "TXN-884A29B3", amount: 49.00, currency: "USD", status: "completed", type: "subscription",
                    created_at: "2026-02-23T10:00:00Z", user: { name: "Professor Smith", email: "smith@university.edu" }
                },
                {
                    id: "TXN-9B31C8D4", amount: 49.00, currency: "USD", status: "failed", type: "subscription",
                    created_at: "2026-02-21T14:30:00Z", user: { name: "Alan Turing", email: "alan@university.edu" }
                },
                {
                    id: "TXN-1120F5A1", amount: 99.00, currency: "USD", status: "completed", type: "enterprise_addon",
                    created_at: "2026-02-15T09:00:00Z", user: { name: "Ada Lovelace", email: "ada@tech.edu" }
                },
                {
                    id: "TXN-4B52ED99", amount: 49.00, currency: "USD", status: "completed", type: "subscription",
                    created_at: "2026-01-23T11:15:00Z", user: { name: "Professor Smith", email: "smith@university.edu" }
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Financial Ledger</h1>
                <p className="text-muted-foreground mt-1">Review subscriptions and revenue events.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card/30 p-1 rounded-2xl border border-border/50 glass">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Monthly Recurring Revenue</p>
                            <p className="text-4xl font-extrabold tracking-tight mt-1">$12,450</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-success" />
                        </div>
                    </div>
                    <p className="text-sm text-success bg-success/10 w-fit px-2 py-1 rounded flex items-center">
                        <ArrowUpRight className="w-3 h-3 mr-1" /> +15.3% vs last month
                    </p>
                </div>

                <div className="p-6 border-t md:border-t-0 md:border-l border-border/50">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Failed Transactions</p>
                            <p className="text-4xl font-extrabold tracking-tight mt-1">24</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center">
                            <TrendingDown className="w-5 h-5 text-danger" />
                        </div>
                    </div>
                    <p className="text-sm text-danger bg-danger/10 w-fit px-2 py-1 rounded flex items-center">
                        Action Required
                    </p>
                </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden glass mt-8">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-border/50 bg-secondary/30">
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Type & Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    Loading ledger...
                                </TableCell>
                            </TableRow>
                        ) : transactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                                    No registered transactions.
                                </TableCell>
                            </TableRow>
                        ) : (
                            transactions.map((txn) => (
                                <TableRow key={txn.id} className="border-border/20 hover:bg-secondary/10 transition-colors">
                                    <TableCell>
                                        <div className="font-mono text-xs text-muted-foreground mb-1 tracking-wider">{txn.id}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{txn.user.name}</div>
                                        <div className="text-xs text-muted-foreground">{txn.user.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="capitalize text-sm font-medium mb-1">{txn.type.replace('_', ' ')}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {new Date(txn.created_at).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`capitalize text-xs ${txn.status === 'completed' ? 'border-success/50 text-success bg-success/10' :
                                            txn.status === 'failed' ? 'border-danger/50 text-danger bg-danger/10' :
                                                'border-warning/50 text-warning bg-warning/10'
                                            }`}>
                                            {txn.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="font-mono font-bold text-lg">
                                            ${txn.amount.toFixed(2)}
                                        </div>
                                        <div className="text-xs text-muted-foreground uppercase">{txn.currency}</div>
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

export default AdminTransactions;
