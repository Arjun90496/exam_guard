import { Link, Outlet, useLocation } from "react-router-dom";
import {
    Users,
    FileText,
    CreditCard,
    LayoutDashboard,
    LogOut,
    ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
    const location = useLocation();

    const navigation = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Exams", href: "/admin/exams", icon: FileText },
        { name: "Transactions", href: "/admin/transactions", icon: CreditCard },
    ];

    const handleLogout = () => {
        // In a real app we would clear auth state & make API call
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border/50 bg-secondary/20 flex flex-col hidden md:flex h-screen sticky top-0">
                <div className="h-16 flex items-center px-6 border-b border-border/50">
                    <Link to="/admin" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-glow-sm">
                            <ShieldAlert className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">
                            Admin<span className="text-gradient">Panel</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                                    }`}
                            >
                                <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border/50">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:text-danger hover:bg-danger/10"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Mobile Header (Hidden on LG) */}
                <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-4 md:hidden">
                    <Link to="/admin" className="flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-primary" />
                        <span className="font-bold">Admin Panel</span>
                    </Link>
                    <Button variant="ghost" size="icon">
                        <LayoutDashboard className="w-5 h-5" />
                    </Button>
                </header>

                {/* Page Content Viewport */}
                <div className="flex-1 overflow-y-auto w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
