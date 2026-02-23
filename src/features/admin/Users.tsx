import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    MoreHorizontal,
    Search,
    ShieldAlert,
    UserCheck,
    UserX
} from "lucide-react";
import { api } from "@/lib/client";
import { toast } from "sonner";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    is_verified: boolean;
    created_at: string;
}

const AdminUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (search = "") => {
        setIsLoading(true);
        try {
            const response = await api.getAdminUsers(search);
            setUsers(response.data.data.data); // Laravel pagination wraps data in data.data
        } catch (error) {
            console.error("Failed to load users:", error);
            toast.error("Failed to load users from server.");

            // Fallback data for preview
            setUsers([
                { id: 1, name: "Admin User", email: "admin@examshield.ai", role: "admin", is_verified: true, created_at: "2026-01-15T10:00:00Z" },
                { id: 2, name: "Professor Smith", email: "smith@university.edu", role: "teacher", is_verified: true, created_at: "2026-02-01T14:30:00Z" },
                { id: 3, name: "Alice Johnson", email: "alice.j@student.edu", role: "student", is_verified: true, created_at: "2026-02-10T09:15:00Z" },
                { id: 4, name: "Bob Williams", email: "bob.w@student.edu", role: "student", is_verified: false, created_at: "2026-02-22T16:45:00Z" },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchUsers(searchQuery);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground mt-1">View and manage all platform users.</p>
                </div>

                <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search users..."
                            className="pl-9 bg-background/50 border-border/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button type="submit" variant="secondary" disabled={isLoading}>Search</Button>
                </form>
            </div>

            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden glass">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-border/50 bg-secondary/30">
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-48 text-center">
                                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                                        Loading users...
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                                    No users found matching your search.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id} className="border-border/20 hover:bg-secondary/10 transition-colors group">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-xs text-muted-foreground">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`capitalize text-xs ${user.role === 'admin' ? 'border-primary/50 text-primary bg-primary/10' :
                                            user.role === 'teacher' ? 'border-accent/50 text-accent bg-accent/10' :
                                                'border-border/50 text-muted-foreground'
                                            }`}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {user.is_verified ? (
                                            <div className="flex items-center text-xs text-success">
                                                <UserCheck className="w-3.5 h-3.5 mr-1" /> Verified
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-xs text-warning">
                                                <UserX className="w-3.5 h-3.5 mr-1" /> Unverified
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="glass border-border/50">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.email)}>
                                                    Copy Email Address
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-border/50" />
                                                <DropdownMenuItem>View Activity Log</DropdownMenuItem>
                                                <DropdownMenuItem className="text-danger focus:text-danger focus:bg-danger/10">
                                                    <ShieldAlert className="w-4 h-4 mr-2" />
                                                    Suspend Account
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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

export default AdminUsers;
