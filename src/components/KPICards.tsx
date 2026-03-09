import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, Activity } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

interface KPI {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  iconName: string;
  gradient: string;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'DollarSign': return DollarSign;
    case 'Users': return Users;
    case 'CreditCard': return CreditCard;
    case 'Activity': return Activity;
    default: return Activity;
  }
};

export function KPICards() {
  const { user } = useAuth();

  const { data: kpis, isLoading, error } = useQuery<KPI[]>({
    queryKey: ['kpis'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/kpis', {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch KPIs');
      return res.json();
    }
  });

  if (isLoading || !kpis) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="dashboard-card h-28 animate-pulse bg-muted/50" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {kpis.map((kpi, i) => {
        const Icon = getIcon(kpi.iconName);
        return (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="dashboard-card flex items-start gap-4"
          >
            <div className={`w-10 h-10 rounded-lg ${kpi.gradient} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-5 h-5" color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">{kpi.title}</p>
              <p className="text-2xl font-heading font-bold text-foreground mt-1">{kpi.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {kpi.positive ? (
                  <TrendingUp className="w-3 h-3 text-primary" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-destructive" />
                )}
                <span className={`text-xs font-medium ${kpi.positive ? "text-primary" : "text-destructive"}`}>
                  {kpi.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
