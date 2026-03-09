import { useState } from "react";
import { Bell, Search, ChevronDown, User, Settings, LogOut, Sun, Moon, Menu, Zap, HelpCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { navItems } from "./DashboardSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";

const tabs = [
  { name: "Overview", path: "/" },
  { name: "Revenue", path: "/billing" },
  { name: "Customers", path: "/customers" },
  { name: "Retention", path: "/analytics" }
];

export function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Helper to get a nice title based on the path
  const getTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/analytics': return 'Analytics';
      case '/customers': return 'Customers';
      case '/billing': return 'Billing';
      case '/reports': return 'Reports';
      case '/settings': return 'Settings';
      case '/help': return 'Help & Support';
      default: return 'Dashboard';
    }
  };


  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
      <div className="flex items-center gap-4 sm:gap-8">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors text-foreground">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0 flex flex-col sidebar-nav">
            <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
            {/* Logo */}
            <div className="p-6 pb-2 mt-4 flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                <img src="/ledgerflow.png" alt="LedgerFlow Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-heading text-lg font-bold" style={{ color: "white" }}>
                LedgerFlow
              </span>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`sidebar-link w-full ${location.pathname === item.path ? "active" : ""}`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Help */}
            <div className="px-3 pb-6">
              <button
                onClick={() => {
                  navigate("/help");
                  setIsMobileMenuOpen(false);
                }}
                className={`sidebar-link w-full ${location.pathname === "/help" ? "active" : ""}`}
              >
                <HelpCircle className="w-5 h-5 flex-shrink-0" />
                <span>Help & Support</span>
              </button>
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="font-heading text-xl font-bold text-foreground">{getTitle()}</h1>
        <nav className="hidden lg:flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${location.pathname === tab.path
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-secondary transition-colors">
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          ) : (
            <Moon className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 pl-4 border-l border-border cursor-pointer hover:opacity-80 transition-opacity outline-none">
              <div className="w-8 h-8 rounded-full kpi-gradient-primary flex items-center justify-center">
                <span className="text-xs font-semibold" style={{ color: "white" }}>
                  {user?.name?.substring(0, 2).toUpperCase() || "U"}
                </span>
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:block">{user?.name || "User"}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
                toast.success("Logged out successfully.");
              }}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
