import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                login(data);
                toast.success("Login successful!");
            } else {
                toast.error(data.message || "Failed to login");
            }
        } catch (error) {
            toast.error("An error occurred during login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-xl kpi-gradient-primary flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="font-heading text-3xl font-bold text-foreground">Welcome Back</h1>
                    <p className="text-muted-foreground mt-2">Enter your credentials to access your dashboard</p>
                </div>

                <div className="dashboard-card border border-border">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 mt-6"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary hover:underline font-medium">
                            Register here
                        </Link>
                        <br />
                        <br />
                        <span className="text-xs opacity-70">Demo Account: demo@ledgerflow.app / password123</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
