import { useState } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, UserCheck, UserX, Search, Filter, MoreHorizontal, Edit, Trash2, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Customer {
  _id: string;
  name: string;
  email: string;
  plan: string;
  mrr: string;
  status: string;
  joined: string;
}

const stats = [
  { label: "Total Customers", value: "12,847", change: "+340", icon: Users, gradient: "kpi-gradient-primary" },
  { label: "New This Month", value: "1,249", change: "+18%", icon: UserPlus, gradient: "kpi-gradient-accent" },
  { label: "Active Users", value: "9,432", change: "+5.2%", icon: UserCheck, gradient: "kpi-gradient-warm" },
  { label: "Churned", value: "128", change: "-12%", icon: UserX, gradient: "kpi-gradient-rose" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const statusColor: Record<string, string> = {
  Active: "bg-primary/10 text-primary",
  Trial: "bg-accent/10 text-accent",
  Churned: "bg-destructive/10 text-destructive",
};

export default function Customers() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const defaultForm = { name: "", email: "", plan: "Starter", mrr: "$29", status: "Active" };
  const [formData, setFormData] = useState(defaultForm);

  const { data: customers, isLoading } = useQuery<Customer[]>({
    queryKey: ['customers'],
    queryFn: async () => {
      const res = await fetch('/api/customers', {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch customers');
      return res.json();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/customers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      if (!res.ok) throw new Error('Failed to delete');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success("Customer deleted");
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const isEdit = !!editingCustomer;
      const url = isEdit ? `/api/customers/${editingCustomer._id}` : '/api/customers';
      const method = isEdit ? 'PUT' : 'POST';
      const payload = isEdit
        ? data
        : { ...data, joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };

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
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success(editingCustomer ? "Customer updated" : "Customer added");
      handleCloseModal();
    }
  });

  const handleOpenModal = (customer?: Customer) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({ name: customer.name, email: customer.email, plan: customer.plan, mrr: customer.mrr, status: customer.status });
    } else {
      setEditingCustomer(null);
      setFormData(defaultForm);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
    setFormData(defaultForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6 relative">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Customers</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage and monitor your customer base.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          + Add Customer
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="dashboard-card flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg ${s.gradient} flex items-center justify-center`}>
              <s.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-xl font-heading font-bold text-foreground">{s.value}</p>
              <span className="text-xs font-medium text-primary">{s.change}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div variants={item} className="dashboard-card !p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input className="pl-9 pr-4 py-2 rounded-lg bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none w-64" placeholder="Search customers..." />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Plan</th>
                <th className="text-left p-4 font-medium text-muted-foreground">MRR</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Joined</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-muted-foreground">Loading customers...</td>
                </tr>
              ) : customers?.map((c) => (
                <tr key={c._id || c.email} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full kpi-gradient-primary flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary-foreground">
                          {c.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{c.plan}</td>
                  <td className="p-4 font-medium text-foreground">{c.mrr}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[c.status] || statusColor.Active}`}>{c.status}</span>
                  </td>
                  <td className="p-4 text-muted-foreground">{c.joined}</td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-secondary rounded transition-colors outline-none">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => handleOpenModal(c)} className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteMutation.mutate(c._id)} className="cursor-pointer text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!customers || customers.length === 0) && !isLoading && (
            <div className="p-8 text-center text-muted-foreground">No customers found. Add your first customer!</div>
          )}
        </div>
      </motion.div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card w-full max-w-md rounded-xl shadow-lg border border-border p-6 relative"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-heading text-xl font-bold text-foreground mb-4">
              {editingCustomer ? 'Edit Customer' : 'Add Customer'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                <input
                  type="text" required
                  value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input
                  type="email" required
                  value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="contact@acme.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Plan</label>
                  <select
                    value={formData.plan} onChange={e => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option>Starter</option>
                    <option>Pro</option>
                    <option>Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">MRR</label>
                  <input
                    type="text" required
                    value={formData.mrr} onChange={e => setFormData({ ...formData, mrr: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="$29"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                <select
                  value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option>Active</option>
                  <option>Trial</option>
                  <option>Churned</option>
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
                  {saveMutation.isPending ? 'Saving...' : 'Save Customer'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
