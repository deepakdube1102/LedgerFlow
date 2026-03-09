import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Upload, Check } from "lucide-react";
import { useState } from "react";

const tabs = [
  { label: "Profile", icon: User },
  { label: "Notifications", icon: Bell },
  { label: "Security", icon: Shield },
  { label: "Appearance", icon: Palette },
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
            <div className="bg-[#1C1D22] border border-[#2A2B32] rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
              <div>
                <h3 className="font-heading text-2xl font-bold text-white mb-1">Profile Information</h3>
                <p className="text-zinc-500 text-sm">Update your personal details and public profile here.</p>
              </div>

              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-[#2A2B32]">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#14F195] to-[#12D886] flex items-center justify-center p-1 shadow-[0_0_20px_rgba(20,241,149,0.2)]">
                    <div className="w-full h-full rounded-full bg-[#0A0B10] flex items-center justify-center overflow-hidden relative">
                      <span className="text-3xl font-bold text-white">JD</span>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Upload className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-3 mb-2">
                    <button className="px-4 py-2 rounded-xl bg-[#2A2B32] text-sm font-medium text-white hover:bg-[#34353E] transition-colors border border-white/5">
                      Change Avatar
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-transparent text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                      Remove
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              {/* Form Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "First Name", value: "John", placeholder: "e.g. Jonas" },
                  { label: "Last Name", value: "Doe", placeholder: "e.g. Davies" },
                  { label: "Email Address", value: "hello@ledgerflow.app", placeholder: "you@example.com", isVerified: true },
                  { label: "Company / Organization", value: "LedgerFlow Inc.", placeholder: "Where do you work?" },
                ].map((f) => (
                  <div key={f.label} className="relative">
                    <label className="text-xs font-medium text-zinc-400 mb-2 block uppercase tracking-wider">{f.label}</label>
                    <div className="relative">
                      <input
                        className="w-full px-4 py-3.5 rounded-xl border border-[#2A2B32] bg-[#0A0B10] text-white text-sm outline-none focus:border-[#14F195] transition-colors"
                        defaultValue={f.value}
                        placeholder={f.placeholder}
                      />
                      {f.isVerified && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-[#14F195]/10 px-2 py-1 rounded text-xs font-semibold text-[#14F195]">
                          <Check className="w-3 h-3" /> Verified
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button className="px-6 py-3 rounded-xl bg-[#14F195] text-[#0A0B10] font-bold text-sm hover:bg-[#12D886] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_15px_rgba(20,241,149,0.3)]">
                  Save Changes
                </button>
              </div>
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

        </motion.div>
      </div>
    </motion.div>
  );
}
