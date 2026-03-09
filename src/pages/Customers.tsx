import { motion } from "framer-motion";
import { Users, UserPlus, UserCheck, UserX, Search, Filter, MoreHorizontal } from "lucide-react";

const stats = [
  { label: "Total Customers", value: "12,847", change: "+340", icon: Users, gradient: "kpi-gradient-primary" },
  { label: "New This Month", value: "1,249", change: "+18%", icon: UserPlus, gradient: "kpi-gradient-accent" },
  { label: "Active Users", value: "9,432", change: "+5.2%", icon: UserCheck, gradient: "kpi-gradient-warm" },
  { label: "Churned", value: "128", change: "-12%", icon: UserX, gradient: "kpi-gradient-rose" },
];

const customers = [
  { name: "Sarah Johnson", email: "sarah@example.com", plan: "Enterprise", mrr: "$299", status: "Active", joined: "Jan 12, 2025" },
  { name: "Michael Chen", email: "michael@example.com", plan: "Pro", mrr: "$79", status: "Active", joined: "Feb 3, 2025" },
  { name: "Emily Rodriguez", email: "emily@example.com", plan: "Starter", mrr: "$29", status: "Active", joined: "Mar 15, 2025" },
  { name: "James Wilson", email: "james@example.com", plan: "Pro", mrr: "$79", status: "Trial", joined: "Apr 1, 2025" },
  { name: "Lisa Anderson", email: "lisa@example.com", plan: "Enterprise", mrr: "$299", status: "Active", joined: "Dec 20, 2024" },
  { name: "David Kim", email: "david@example.com", plan: "Starter", mrr: "$29", status: "Churned", joined: "Nov 8, 2024" },
  { name: "Anna Müller", email: "anna@example.com", plan: "Pro", mrr: "$79", status: "Active", joined: "Jan 28, 2025" },
  { name: "Robert Taylor", email: "robert@example.com", plan: "Enterprise", mrr: "$299", status: "Active", joined: "Feb 14, 2025" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const statusColor: Record<string, string> = {
  Active: "bg-primary/10 text-primary",
  Trial: "bg-accent/10 text-accent",
  Churned: "bg-destructive/10 text-destructive",
};

export default function Customers() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Customers</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage and monitor your customer base.</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          + Add Customer
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="dashboard-card flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg ${s.gradient} flex items-center justify-center`}>
              <s.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-xl font-heading font-bold text-foreground">{s.value}</p>
              <span className="text-xs font-medium text-primary">{s.change}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div variants={item} className="dashboard-card !p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input className="pl-9 pr-4 py-2 rounded-lg bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none w-64" placeholder="Search customers..." />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Plan</th>
                <th className="text-left p-4 font-medium text-muted-foreground">MRR</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Joined</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.email} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full kpi-gradient-primary flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary-foreground">{c.name.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{c.plan}</td>
                  <td className="p-4 font-medium text-foreground">{c.mrr}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="p-4 text-muted-foreground">{c.joined}</td>
                  <td className="p-4">
                    <button className="p-1 hover:bg-secondary rounded transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
