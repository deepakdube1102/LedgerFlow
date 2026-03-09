import { motion } from "framer-motion";

const conversions = [
  { label: "Free → Trial", value: 68, color: "bg-primary" },
  { label: "Trial → Paid", value: 42, color: "bg-accent" },
  { label: "Paid → Enterprise", value: 18, color: "bg-chart-3" },
];

export function ConversionBars() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="dashboard-card"
    >
      <h3 className="font-heading font-semibold text-foreground mb-1">Trial Conversions</h3>
      <p className="text-sm text-muted-foreground mb-6">Conversion funnel breakdown</p>
      <div className="space-y-5">
        {conversions.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground">{item.label}</span>
              <span className="text-sm font-semibold text-foreground">{item.value}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full ${item.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
