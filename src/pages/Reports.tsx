import { motion } from "framer-motion";
import { BarChart3, Download, Calendar, FileText, TrendingUp, PieChart } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from "recharts";

const growthData = [
  { month: "Jan", mrr: 42000, arr: 504000 },
  { month: "Feb", mrr: 45000, arr: 540000 },
  { month: "Mar", mrr: 48000, arr: 576000 },
  { month: "Apr", mrr: 52000, arr: 624000 },
  { month: "May", mrr: 55000, arr: 660000 },
  { month: "Jun", mrr: 58000, arr: 696000 },
  { month: "Jul", mrr: 62000, arr: 744000 },
  { month: "Aug", mrr: 68000, arr: 816000 },
];

const segmentData = [
  { name: "Enterprise", value: 45 },
  { name: "Pro", value: 35 },
  { name: "Starter", value: 20 },
];

const COLORS = ["hsl(168,80%,36%)", "hsl(252,56%,57%)", "hsl(38,92%,50%)"];

const reports = [
  { name: "Monthly Revenue Report", type: "Financial", date: "Mar 1, 2025", icon: TrendingUp },
  { name: "Customer Acquisition Report", type: "Growth", date: "Feb 28, 2025", icon: BarChart3 },
  { name: "Churn Analysis Q1 2025", type: "Retention", date: "Feb 25, 2025", icon: PieChart },
  { name: "Annual Financial Summary", type: "Financial", date: "Feb 15, 2025", icon: FileText },
  { name: "User Engagement Metrics", type: "Product", date: "Feb 10, 2025", icon: TrendingUp },
  { name: "Cohort Analysis Feb 2025", type: "Retention", date: "Feb 5, 2025", icon: BarChart3 },
];

const typeColor: Record<string, string> = {
  Financial: "bg-primary/10 text-primary",
  Growth: "bg-accent/10 text-accent",
  Retention: "bg-chart-3/10 text-chart-3",
  Product: "bg-chart-4/10 text-chart-4",
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Reports() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Reports</h2>
          <p className="text-muted-foreground text-sm mt-1">Generate and view financial & product reports.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Download className="w-4 h-4" /> Export All
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <motion.div variants={item} className="lg:col-span-2 dashboard-card">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">MRR / ARR Growth</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(168,80%,36%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(168,80%,36%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)" }} formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
              <Area type="monotone" dataKey="mrr" stroke="hsl(168,80%,36%)" fill="url(#mrrGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Segment Pie */}
        <motion.div variants={item} className="dashboard-card flex flex-col items-center justify-center">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4 self-start">Revenue by Segment</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RePieChart>
              <Pie data={segmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                {segmentData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)" }} />
            </RePieChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            {segmentData.map((s, i) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                {s.name} ({s.value}%)
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Report List */}
      <motion.div variants={item} className="dashboard-card !p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold text-foreground">Saved Reports</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" /> Last 30 days
          </div>
        </div>
        <div className="divide-y divide-border">
          {reports.map((r) => (
            <div key={r.name} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                  <r.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeColor[r.type]}`}>{r.type}</span>
                <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
