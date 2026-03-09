import { useState } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: TrendingUp, label: "Analytics" },
  { icon: Users, label: "Customers" },
  { icon: CreditCard, label: "Billing" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="sidebar-nav h-screen flex flex-col py-6 relative flex-shrink-0"
    >
      {/* Logo */}
      <div className="px-5 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg kpi-gradient-primary flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4" color="white" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-heading text-lg font-bold"
            style={{ color: "white" }}
          >
            FinTrack
          </motion.span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`sidebar-link ${item.active ? "active" : ""}`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      {/* Help */}
      <div className="px-3 mt-auto">
        <a href="#" className="sidebar-link">
          <HelpCircle className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Help & Support</span>}
        </a>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-foreground" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-foreground" />
        )}
      </button>
    </motion.aside>
  );
}
