import { motion } from "framer-motion";
import { CreditCard, DollarSign, Receipt, ArrowUpRight, Check } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Jul", revenue: 32000 },
  { month: "Aug", revenue: 38000 },
  { month: "Sep", revenue: 41000 },
  { month: "Oct", revenue: 45000 },
  { month: "Nov", revenue: 52000 },
  { month: "Dec", revenue: 48000 },
  { month: "Jan", revenue: 58000 },
  { month: "Feb", revenue: 62000 },
  { month: "Mar", revenue: 68000 },
];

const invoices = [
  { id: "INV-0042", customer: "Acme Corp", amount: "$2,400", status: "Paid", date: "Mar 1, 2025" },
  { id: "INV-0041", customer: "Globex Inc", amount: "$1,800", status: "Paid", date: "Feb 28, 2025" },
  { id: "INV-0040", customer: "Wayne Ent.", amount: "$3,200", status: "Pending", date: "Feb 25, 2025" },
  { id: "INV-0039", customer: "Stark Labs", amount: "$950", status: "Paid", date: "Feb 20, 2025" },
  { id: "INV-0038", customer: "Umbrella Co", amount: "$1,500", status: "Overdue", date: "Feb 15, 2025" },
  { id: "INV-0037", customer: "Cyberdyne", amount: "$4,100", status: "Paid", date: "Feb 10, 2025" },
];

const plans = [
  { name: "Starter", price: "$29", features: ["5 projects", "10K events/mo", "Email support"], popular: false },
  { name: "Pro", price: "$79", features: ["25 projects", "100K events/mo", "Priority support", "API access"], popular: true },
  { name: "Enterprise", price: "$299", features: ["Unlimited projects", "Unlimited events", "Dedicated support", "SSO & SAML", "Custom SLAs"], popular: false },
];

const stats = [
  { label: "Monthly Revenue", value: "$68,400", change: "+10.3%", icon: DollarSign },
  { label: "Active Subscriptions", value: "1,247", change: "+84", icon: CreditCard },
  { label: "Pending Invoices", value: "23", change: "$12.4K", icon: Receipt },
  { label: "Avg. Revenue/User", value: "$54.80", change: "+$3.20", icon: ArrowUpRight },
];

const statusColor: Record<string, string> = {
  Paid: "bg-primary/10 text-primary",
  Pending: "bg-accent/10 text-accent",
  Overdue: "bg-destructive/10 text-destructive",
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Billing() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6">
      <motion.div variants={item}>
        <h2 className="font-heading text-2xl font-bold text-foreground">Billing</h2>
        <p className="text-muted-foreground text-sm mt-1">Revenue overview, invoices, and subscription plans.</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="dashboard-card flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-xl font-heading font-bold text-foreground">{s.value}</p>
              <span className="text-xs font-medium text-primary">{s.change}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Revenue Chart */}
      <motion.div variants={item} className="dashboard-card">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={revenueData}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(168,80%,36%)" stopOpacity={0.9} />
                <stop offset="100%" stopColor="hsl(168,80%,36%)" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
            <XAxis dataKey="month" tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} />
            <YAxis tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}K`} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)" }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
            <Bar dataKey="revenue" fill="url(#revGrad)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoices */}
        <motion.div variants={item} className="dashboard-card !p-0 overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-heading text-lg font-semibold text-foreground">Recent Invoices</h3>
          </div>
          <div className="divide-y divide-border">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <div>
                  <p className="font-medium text-foreground text-sm">{inv.customer}</p>
                  <p className="text-xs text-muted-foreground">{inv.id} · {inv.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-heading font-semibold text-foreground text-sm">{inv.amount}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[inv.status]}`}>{inv.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Plans */}
        <motion.div variants={item} className="space-y-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">Subscription Plans</h3>
          {plans.map((plan) => (
            <div key={plan.name} className={`dashboard-card relative ${plan.popular ? "ring-2 ring-primary" : ""}`}>
              {plan.popular && (
                <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">Popular</span>
              )}
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-heading font-bold text-foreground">{plan.name}</h4>
                <span className="font-heading text-2xl font-bold text-foreground">{plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></span>
              </div>
              <ul className="space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
