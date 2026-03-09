import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

interface MAUData {
  month: string;
  users: number;
}

export function MAUChart() {
  const { user } = useAuth();

  const { data: mauData, isLoading, error } = useQuery<MAUData[]>({
    queryKey: ['mau'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/mau', {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch MAU data');
      return res.json();
    }
  });

  if (isLoading || !mauData) {
    return <div className="dashboard-card h-96 animate-pulse bg-muted/50" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="dashboard-card"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-semibold text-foreground">Monthly Active Users</h3>
          <p className="text-sm text-muted-foreground mt-1">User growth over the past 12 months</p>
        </div>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary">+137% YoY</span>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mauData} barSize={24}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} />
            <Tooltip
              contentStyle={{
                background: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 12px -2px rgb(0 0 0 / 0.08)",
                fontSize: "13px",
              }}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(168, 80%, 36%)" />
                <stop offset="100%" stopColor="hsl(168, 80%, 46%)" />
              </linearGradient>
            </defs>
            <Bar dataKey="users" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
