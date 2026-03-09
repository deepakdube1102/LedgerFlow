import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpCircle, Search, Filter, MoreHorizontal, Edit, Trash2, X, Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExpenseRecord {
    _id: string;
    vendor: string;
    amount: number;
    date: string;
    category: string;
    notes: string;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Expenses() {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<ExpenseRecord | null>(null);

    const defaultForm = { vendor: "", amount: "", date: new Date().toISOString().split('T')[0], category: "Software", notes: "" };
    const [formData, setFormData] = useState(defaultForm);

    const { data: expenseRecords, isLoading } = useQuery<ExpenseRecord[]>({
        queryKey: ['expenses'],
        queryFn: async () => {
            const res = await fetch('/api/expenses', {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            if (!res.ok) throw new Error('Failed to fetch expense records');
            return res.json();
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/expenses/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            if (!res.ok) throw new Error('Failed to delete');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            toast.success("Expense record deleted");
        }
    });

    const saveMutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const isEdit = !!editingRecord;
            const url = isEdit ? `/api/expenses/${editingRecord._id}` : '/api/expenses';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`
                },
                body: JSON.stringify({ ...data, amount: Number(data.amount) })
            });
            if (!res.ok) throw new Error('Failed to save');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            toast.success(editingRecord ? "Expense updated" : "Expense added");
            handleCloseModal();
        }
    });

    const handleOpenModal = (record?: ExpenseRecord) => {
        if (record) {
            setEditingRecord(record);
            setFormData({
                vendor: record.vendor,
                amount: record.amount.toString(),
                date: new Date(record.date).toISOString().split('T')[0],
                category: record.category,
                notes: record.notes || ""
            });
        } else {
            setEditingRecord(null);
            setFormData(defaultForm);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingRecord(null);
        setFormData(defaultForm);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveMutation.mutate(formData);
    };

    const totalExpenses = expenseRecords?.reduce((sum, record) => sum + record.amount, 0) || 0;

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6 relative">
            <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">Expenses</h2>
                    <p className="text-muted-foreground text-sm mt-1">Track your outgoing payments and costs.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center shrink-0 w-fit"
                >
                    <Plus className="w-4 h-4 mr-1" /> Log Expense
                </button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="dashboard-card flex items-center gap-4 border-l-4 border-destructive">
                    <div className="w-12 h-12 rounded-xl kpi-gradient-rose flex items-center justify-center">
                        <ArrowUpCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Total Expenses</p>
                        <p className="text-2xl font-heading font-bold text-foreground">${totalExpenses.toLocaleString()}</p>
                    </div>
                </div>
            </motion.div>

            {/* Table */}
            <motion.div variants={item} className="dashboard-card !p-0 overflow-hidden">
                <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input className="pl-9 pr-4 py-2 w-full rounded-lg bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none" placeholder="Search expenses..." />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors shrink-0">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/50">
                                <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Vendor</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                                <th className="text-right p-4 font-medium text-muted-foreground">Amount</th>
                                <th className="p-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-muted-foreground">Loading expense records...</td>
                                </tr>
                            ) : expenseRecords?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-muted-foreground">No expense records found.</td>
                                </tr>
                            ) : expenseRecords?.map((record) => (
                                <tr key={record._id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                                    <td className="p-4 text-muted-foreground">{new Date(record.date).toLocaleDateString()}</td>
                                    <td className="p-4 font-medium text-foreground">{record.vendor}</td>
                                    <td className="p-4">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                            {record.category}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right font-heading font-bold text-destructive">
                                        -${record.amount.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-1 hover:bg-secondary rounded transition-colors outline-none">
                                                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem onClick={() => handleOpenModal(record)} className="cursor-pointer">
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => deleteMutation.mutate(record._id)} className="cursor-pointer text-destructive focus:text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                            {editingRecord ? 'Edit Expense' : 'Log Expense'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Vendor / Description</label>
                                <input
                                    type="text" required
                                    value={formData.vendor} onChange={e => setFormData({ ...formData, vendor: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="AWS Hosting"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Amount ($)</label>
                                    <input
                                        type="number" required min="0" step="0.01"
                                        value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        placeholder="250"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Date</label>
                                    <input
                                        type="date" required
                                        value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                                <select
                                    value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                    <option>Software</option>
                                    <option>Marketing</option>
                                    <option>Office</option>
                                    <option>Legal</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Notes (Optional)</label>
                                <textarea
                                    value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-20"
                                    placeholder="Monthly server costs..."
                                />
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
                                    className="px-4 py-2 text-sm font-medium bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 disabled:opacity-50 transition-colors"
                                >
                                    {saveMutation.isPending ? 'Saving...' : 'Save Expense'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}
