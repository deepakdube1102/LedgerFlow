import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Globe, Key } from "lucide-react";
import { useState } from "react";

const tabs = [
  { label: "Profile", icon: User },
  { label: "Notifications", icon: Bell },
  { label: "Security", icon: Shield },
  { label: "Appearance", icon: Palette },
  { label: "API Keys", icon: Key },
  { label: "Integrations", icon: Globe },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(!on)} className={`w-10 h-6 rounded-full transition-colors ${on ? "bg-primary" : "bg-border"} relative`}>
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-primary-foreground transition-transform ${on ? "left-5" : "left-1"}`} />
    </button>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6">
      <motion.div variants={item}>
        <h2 className="font-heading text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground text-sm mt-1">Manage your account and preferences.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Nav */}
        <motion.div variants={item} className="dashboard-card !p-2 lg:col-span-1 h-fit">
          <nav className="space-y-0.5">
            {tabs.map((t) => (
              <button
                key={t.label}
                onClick={() => setActiveTab(t.label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === t.label ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
              >
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Content */}
        <motion.div variants={item} className="lg:col-span-3 space-y-6">
          {activeTab === "Profile" && (
            <div className="dashboard-card space-y-6">
              <h3 className="font-heading text-lg font-semibold text-foreground">Profile Information</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full kpi-gradient-primary flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">JD</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">John Doe</p>
                  <p className="text-sm text-muted-foreground">john@example.com</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "First Name", value: "John" },
                  { label: "Last Name", value: "Doe" },
                  { label: "Email", value: "john@example.com" },
                  { label: "Company", value: "LedgerFlow Inc." },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{f.label}</label>
                    <input className="w-full px-3 py-2 rounded-lg border border-border bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" defaultValue={f.value} />
                  </div>
                ))}
              </div>
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Save Changes</button>
            </div>
          )}

          {activeTab === "Notifications" && (
            <div className="dashboard-card space-y-5">
              <h3 className="font-heading text-lg font-semibold text-foreground">Notification Preferences</h3>
              {[
                { title: "Email Notifications", desc: "Receive email updates about your account", on: true },
                { title: "Revenue Alerts", desc: "Get notified when revenue milestones are hit", on: true },
                { title: "Weekly Reports", desc: "Receive a weekly summary email", on: false },
                { title: "New Customer Alerts", desc: "Get notified for each new signup", on: true },
                { title: "Churn Warnings", desc: "Alert when customers show churn signals", on: true },
              ].map((n) => (
                <div key={n.title} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <Toggle defaultOn={n.on} />
                </div>
              ))}
            </div>
          )}

          {activeTab === "Security" && (
            <div className="dashboard-card space-y-5">
              <h3 className="font-heading text-lg font-semibold text-foreground">Security Settings</h3>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Current Password</label>
                <input type="password" className="w-full max-w-md px-3 py-2 rounded-lg border border-border bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" placeholder="••••••••" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">New Password</label>
                <input type="password" className="w-full max-w-md px-3 py-2 rounded-lg border border-border bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" placeholder="••••••••" />
              </div>
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Update Password</button>
              <div className="border-t border-border pt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Toggle defaultOn={false} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "Appearance" && (
            <div className="dashboard-card space-y-5">
              <h3 className="font-heading text-lg font-semibold text-foreground">Appearance</h3>
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Theme</p>
                <div className="flex gap-3">
                  {["Light", "Dark", "System"].map((t) => (
                    <button key={t} className={`px-4 py-2 rounded-lg text-sm border transition-colors ${t === "Light" ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground hover:bg-secondary"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Compact Mode</p>
                  <p className="text-xs text-muted-foreground">Reduce spacing for denser information display</p>
                </div>
                <Toggle defaultOn={false} />
              </div>
            </div>
          )}

          {activeTab === "API Keys" && (
            <div className="dashboard-card space-y-5">
              <h3 className="font-heading text-lg font-semibold text-foreground">API Keys</h3>
              <p className="text-sm text-muted-foreground">Manage your API keys for programmatic access.</p>
              <div className="space-y-3">
                {[
                  { name: "Production Key", key: "sk_live_••••••••4f2a", created: "Jan 10, 2025" },
                  { name: "Development Key", key: "sk_test_••••••••8b1c", created: "Feb 5, 2025" },
                ].map((k) => (
                  <div key={k.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                    <div>
                      <p className="text-sm font-medium text-foreground">{k.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{k.key} · Created {k.created}</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors">Revoke</button>
                  </div>
                ))}
              </div>
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Generate New Key</button>
            </div>
          )}

          {activeTab === "Integrations" && (
            <div className="dashboard-card space-y-5">
              <h3 className="font-heading text-lg font-semibold text-foreground">Integrations</h3>
              {[
                { name: "Slack", desc: "Send alerts to your Slack channels", connected: true },
                { name: "Stripe", desc: "Sync payment and subscription data", connected: true },
                { name: "HubSpot", desc: "Sync customer data to your CRM", connected: false },
                { name: "Zapier", desc: "Automate workflows with 5,000+ apps", connected: false },
              ].map((int) => (
                <div key={int.name} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{int.name}</p>
                    <p className="text-xs text-muted-foreground">{int.desc}</p>
                  </div>
                  <button className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${int.connected ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                    {int.connected ? "Connected" : "Connect"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
