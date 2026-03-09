import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const retentionData = [
  { name: "Retained", value: 78, color: "hsl(168, 80%, 36%)" },
  { name: "Churned", value: 22, color: "hsl(220, 13%, 91%)" },
];

const retentionByMonth = [
  { month: "Month 1", rate: 92 },
  { month: "Month 3", rate: 78 },
  { month: "Month 6", rate: 65 },
  { month: "Month 12", rate: 52 },
];

export function RetentionAnalysis() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="dashboard-card"
    >
      <h3 className="font-heading font-semibold text-foreground mb-1">Retention Analysis</h3>
      <p className="text-sm text-muted-foreground mb-6">Customer retention rate</p>

      <div className="flex items-center gap-6">
        <div className="w-32 h-32 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={retentionData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                strokeWidth={0}
              >
                {retentionData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-heading font-bold text-foreground">78%</span>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          {retentionByMonth.map((item) => (
            <div key={item.month} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.month}</span>
              <span className="text-sm font-semibold text-foreground">{item.rate}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
