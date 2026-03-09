import { motion } from "framer-motion";
import { HelpCircle, Book, MessageCircle, Mail, ExternalLink, Search, ChevronRight } from "lucide-react";

const faqs = [
  { q: "How do I upgrade my plan?", a: "Navigate to Billing > Subscription Plans and select the plan you'd like to upgrade to." },
  { q: "How is MRR calculated?", a: "Monthly Recurring Revenue includes all active subscription revenue normalized to a monthly period." },
  { q: "Can I export my data?", a: "Yes, go to Reports and click 'Export All' to download your data in CSV or PDF format." },
  { q: "How do I invite team members?", a: "Go to Settings > Profile and use the team management section to send invitations." },
  { q: "What payment methods are supported?", a: "We support all major credit cards, ACH bank transfers, and wire transfers for Enterprise plans." },
];

const resources = [
  { title: "Documentation", desc: "Comprehensive guides and API reference", icon: Book, link: "#" },
  { title: "Community Forum", desc: "Connect with other LedgerFlow users", icon: MessageCircle, link: "#" },
  { title: "Contact Support", desc: "Get help from our support team", icon: Mail, link: "#" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function HelpSupport() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6">
      <motion.div variants={item}>
        <h2 className="font-heading text-2xl font-bold text-foreground">Help & Support</h2>
        <p className="text-muted-foreground text-sm mt-1">Find answers, browse docs, or contact us.</p>
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="dashboard-card flex items-center gap-3">
        <Search className="w-5 h-5 text-muted-foreground" />
        <input className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground outline-none" placeholder="Search for help articles, guides, or FAQs..." />
      </motion.div>

      {/* Resources */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map((r) => (
          <a key={r.title} href={r.link} className="dashboard-card flex items-start gap-4 hover:border-primary/30 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <r.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <h3 className="font-heading font-semibold text-foreground text-sm">{r.title}</h3>
                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
            </div>
          </a>
        ))}
      </motion.div>

      {/* FAQ */}
      <motion.div variants={item} className="dashboard-card">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Frequently Asked Questions</h3>
        <div className="divide-y divide-border">
          {faqs.map((faq) => (
            <details key={faq.q} className="py-4 group">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-foreground list-none">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  {faq.q}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>
              <p className="text-sm text-muted-foreground mt-2 pl-7">{faq.a}</p>
            </details>
          ))}
        </div>
      </motion.div>

      {/* Contact */}
      <motion.div variants={item} className="dashboard-card text-center py-8">
        <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
        <h3 className="font-heading font-semibold text-foreground">Still need help?</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">Our support team typically responds within 2 hours.</p>
        <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          Contact Support
        </button>
      </motion.div>
    </motion.div>
  );
}
