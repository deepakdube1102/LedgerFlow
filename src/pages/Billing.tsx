import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, DollarSign, Receipt, ArrowUpRight, Check, Plus, Edit, Trash2, X, MoreHorizontal } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Invoice {
  _id: string;
  id: string;
  customer: string;
  amount: string;
  status: string;
  date: string;
}

interface Plan {
  name: string;
  price: string;
  features: string[];
  popular: boolean;
}

interface RevenueData {
  month: string;
  revenue: number;
}

const stats = [
  { label: "Monthly Revenue", value: "$68,400", change: "+10.3%", icon: DollarSign },
  { label: "Active Subscriptions", value: "1,247", change: "+84", icon: CreditCard },
  { label: "Pending Invoices", value: "23", change: "$12.4K", icon: Receipt },
  { label: "Avg. Revenue/User", value: "$54.80", change: "+$3.20", icon: ArrowUpRight },
];

const statusColor: Record<string, string> = {
  Paid: "bg-primary/10 text-primary",
  Pending: "bg-accent/10 text-accent",
  Overdue: "bg-destructive/10 text-destructive",
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Billing() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const defaultForm = { id: "", customer: "", amount: "", status: "Paid" };
  const [formData, setFormData] = useState(defaultForm);

  const { data: invoices, isLoading: isLoadingInvoices } = useQuery<Invoice[]>({
    queryKey: ['invoices'],
    queryFn: async () => {
      const res = await fetch('/api/billing/invoices', { headers: { Authorization: `Bearer ${user?.token}` } });
      if (!res.ok) throw new Error('Failed to fetch invoices');
      return res.json();
    }
  });

  const { data: plans, isLoading: isLoadingPlans } = useQuery<Plan[]>({
    queryKey: ['plans'],
    queryFn: async () => {
      const res = await fetch('/api/billing/plans', { headers: { Authorization: `Bearer ${user?.token}` } });
      if (!res.ok) throw new Error('Failed to fetch plans');
      return res.json();
    }
  });

  const { data: revenueData, isLoading: isLoadingRevenue } = useQuery<RevenueData[]>({
    queryKey: ['revenue'],
    queryFn: async () => {
      const res = await fetch('/api/billing/revenue', { headers: { Authorization: `Bearer ${user?.token}` } });
      if (!res.ok) throw new Error('Failed to fetch revenue');
      return res.json();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/billing/invoices/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      if (!res.ok) throw new Error('Failed to delete');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success("Invoice deleted");
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const isEdit = !!editingInvoice;
      const url = isEdit ? `/api/billing/invoices/${editingInvoice._id}` : '/api/billing/invoices';
      const method = isEdit ? 'PUT' : 'POST';
      const payload = isEdit
        ? data
        : { ...data, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success(editingInvoice ? "Invoice updated" : "Invoice created");
      handleCloseModal();
    }
  });

  const handleOpenModal = (invoice?: Invoice) => {
    if (invoice) {
      setEditingInvoice(invoice);
      setFormData({ id: invoice.id, customer: invoice.customer, amount: invoice.amount, status: invoice.status });
    } else {
      setEditingInvoice(null);
      setFormData({ ...defaultForm, id: `INV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingInvoice(null);
    setFormData(defaultForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6 relative">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Billing</h2>
          <p className="text-muted-foreground text-sm mt-1">Revenue overview, invoices, and subscription plans.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center shrink-0 w-fit"
        >
          <Plus className="w-4 h-4 mr-1" /> Create Invoice
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="dashboard-card flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-xl font-heading font-bold text-foreground">{s.value}</p>
              <span className="text-xs font-medium text-primary">{s.change}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Revenue Chart */}
      <motion.div variants={item} className="dashboard-card">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
        {isLoadingRevenue ? (
          <div className="h-[280px] flex items-center justify-center animate-pulse bg-muted/50 rounded-lg" />
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(168,80%,36%)" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="hsl(168,80%,36%)" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(220,9%,46%)", fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)" }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="url(#revGrad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoices */}
        <motion.div variants={item} className="dashboard-card !p-0 overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-heading text-lg font-semibold text-foreground">Recent Invoices</h3>
          </div>
          <div className="divide-y divide-border h-full">
            {isLoadingInvoices ? (
              <div className="p-4 text-center text-muted-foreground">Loading invoices...</div>
            ) : invoices?.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No invoices found.</div>
            ) : invoices?.map((inv) => (
              <div key={inv._id} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <div>
                  <p className="font-medium text-foreground text-sm">{inv.customer}</p>
                  <p className="text-xs text-muted-foreground">{inv.id} · {inv.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="font-heading font-semibold text-foreground text-sm">{inv.amount}</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[inv.status] || statusColor.Paid}`}>{inv.status}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-secondary rounded transition-colors outline-none shrink-0 border border-transparent hover:border-border">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => handleOpenModal(inv)} className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteMutation.mutate(inv._id)} className="cursor-pointer text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Plans */}
        <motion.div variants={item} className="space-y-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">Subscription Plans</h3>
          {isLoadingPlans ? (
            <div className="p-4 text-center text-muted-foreground">Loading plans...</div>
          ) : plans?.map((plan) => (
            <div key={plan.name} className={`dashboard-card relative ${plan.popular ? "ring-2 ring-primary border-transparent" : "border border-border"}`}>
              {plan.popular && (
                <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">Popular</span>
              )}
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-heading font-bold text-foreground">{plan.name}</h4>
                <span className="font-heading text-2xl font-bold text-foreground">{plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></span>
              </div>
              <ul className="space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card w-full max-w-md rounded-xl shadow-lg border border-border p-6 relative"
          >
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-heading text-xl font-bold text-foreground mb-4">
              {editingInvoice ? 'Edit Invoice' : 'Create Invoice'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Invoice ID</label>
                  <input
                    type="text" required
                    value={formData.id} onChange={e => setFormData({ ...formData, id: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Amount</label>
                  <input
                    type="text" required
                    value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="$1,200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Customer / Company</label>
                <input
                  type="text" required
                  value={formData.customer} onChange={e => setFormData({ ...formData, customer: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                <select
                  value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Overdue</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button" onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={saveMutation.isPending}
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {saveMutation.isPending ? 'Saving...' : 'Save Invoice'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
