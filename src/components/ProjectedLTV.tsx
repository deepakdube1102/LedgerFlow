import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export function ProjectedLTV() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="dashboard-card"
    >
      <h3 className="font-heading font-semibold text-foreground mb-1">Projected LTV</h3>
      <p className="text-sm text-muted-foreground mb-4">Average lifetime value</p>
      <div className="text-3xl font-heading font-bold text-foreground mb-2">$1,247</div>
      <div className="flex items-center gap-1">
        <TrendingUp className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">+18.3%</span>
        <span className="text-sm text-muted-foreground">from Q3</span>
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Basic Plan</span>
          <span className="font-medium text-foreground">$420</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Pro Plan</span>
          <span className="font-medium text-foreground">$1,180</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Enterprise</span>
          <span className="font-medium text-foreground">$3,840</span>
        </div>
      </div>
    </motion.div>
  );
}
