import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, Activity } from "lucide-react";

const kpis = [
  {
    title: "Total Revenue",
    value: "$48,352",
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
    gradient: "kpi-gradient-primary",
  },
  {
    title: "Active Users",
    value: "2,847",
    change: "+8.2%",
    positive: true,
    icon: Users,
    gradient: "kpi-gradient-accent",
  },
  {
    title: "Subscriptions",
    value: "1,243",
    change: "+4.1%",
    positive: true,
    icon: CreditCard,
    gradient: "kpi-gradient-warm",
  },
  {
    title: "Churn Rate",
    value: "2.4%",
    change: "-0.3%",
    positive: true,
    icon: Activity,
    gradient: "kpi-gradient-rose",
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {kpis.map((kpi, i) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="dashboard-card flex items-start gap-4"
        >
          <div className={`w-10 h-10 rounded-lg ${kpi.gradient} flex items-center justify-center flex-shrink-0`}>
            <kpi.icon className="w-5 h-5" color="white" />
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
      ))}
    </div>
  );
}
