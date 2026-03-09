import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowUpRight, Eye, MousePointerClick, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from "recharts";

const trafficData = [
  { name: "Mon", visitors: 2400, pageViews: 4200 },
  { name: "Tue", visitors: 1398, pageViews: 3100 },
  { name: "Wed", visitors: 3800, pageViews: 5800 },
  { name: "Thu", visitors: 3908, pageViews: 6200 },
  { name: "Fri", visitors: 4800, pageViews: 7100 },
  { name: "Sat", visitors: 3800, pageViews: 5400 },
  { name: "Sun", visitors: 4300, pageViews: 6800 },
];

const conversionData = [
  { name: "Week 1", rate: 2.4 },
  { name: "Week 2", rate: 3.1 },
  { name: "Week 3", rate: 2.8 },
  { name: "Week 4", rate: 3.6 },
  { name: "Week 5", rate: 4.1 },
  { name: "Week 6", rate: 3.9 },
  { name: "Week 7", rate: 4.5 },
  { name: "Week 8", rate: 4.8 },
];

const channelData = [
  { name: "Organic", value: 4200 },
  { name: "Paid", value: 3100 },
  { name: "Social", value: 2400 },
  { name: "Referral", value: 1800 },
  { name: "Email", value: 1200 },
  { name: "Direct", value: 900 },
];

const metrics = [
  { label: "Total Visitors", value: "48.2K", change: "+12.5%", up: true, icon: Eye },
  { label: "Avg. Session", value: "4m 32s", change: "+8.3%", up: true, icon: Clock },
  { label: "Bounce Rate", value: "32.1%", change: "-4.2%", up: true, icon: MousePointerClick },
  { label: "Conversion Rate", value: "4.8%", change: "+1.2%", up: true, icon: ArrowUpRight },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Analytics() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6">
      <motion.div variants={item}>
        <h2 className="font-heading text-2xl font-bold text-foreground">Analytics</h2>
        <p className="text-muted-foreground text-sm mt-1">Track traffic, engagement, and conversion metrics.</p>
      </motion.div>

      {/* Metrics */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="dashboard-card flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <m.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{m.label}</p>
              <p className="text-xl font-heading font-bold text-foreground">{m.value}</p>
              <span className={`text-xs font-medium ${m.up ? "text-primary" : "text-destructive"}`}>
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Traffic Chart */}
      <motion.div variants={item} className="dashboard-card">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Traffic Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trafficData}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(168,80%,36%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(168,80%,36%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(252,56%,57%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(252,56%,57%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
            <XAxis dataKey="name" tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} />
            <YAxis tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)" }} />
            <Area type="monotone" dataKey="visitors" stroke="hsl(168,80%,36%)" fill="url(#colorVisitors)" strokeWidth={2} />
            <Area type="monotone" dataKey="pageViews" stroke="hsl(252,56%,57%)" fill="url(#colorPageViews)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Trend */}
        <motion.div variants={item} className="dashboard-card">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Conversion Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis dataKey="name" tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} unit="%" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)" }} />
              <Line type="monotone" dataKey="rate" stroke="hsl(38,92%,50%)" strokeWidth={2} dot={{ fill: "hsl(38,92%,50%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Channel Breakdown */}
        <motion.div variants={item} className="dashboard-card">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Channel Breakdown</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={channelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis type="number" tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} width={70} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)" }} />
              <Bar dataKey="value" fill="hsl(168,80%,36%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
}
