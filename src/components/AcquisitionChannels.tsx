import { motion } from "framer-motion";

const channels = [
  { name: "Organic Search", value: 38, color: "bg-primary" },
  { name: "Direct", value: 24, color: "bg-accent" },
  { name: "Referral", value: 18, color: "bg-chart-3" },
  { name: "Social Media", value: 12, color: "bg-chart-5" },
  { name: "Paid Ads", value: 8, color: "bg-chart-4" },
];

export function AcquisitionChannels() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.4 }}
      className="dashboard-card"
    >
      <h3 className="font-heading font-semibold text-foreground mb-1">Acquisition Channels</h3>
      <p className="text-sm text-muted-foreground mb-6">Traffic source breakdown</p>
      <div className="space-y-4">
        {channels.map((ch) => (
          <div key={ch.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-foreground">{ch.name}</span>
              <span className="text-sm font-semibold text-foreground">{ch.value}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${ch.value}%` }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                className={`h-full rounded-full ${ch.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
