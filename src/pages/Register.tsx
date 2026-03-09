import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                login(data);
                toast.success("Successfully registered!");
            } else {
                toast.error(data.message || "Failed to register");
            }
        } catch (error) {
            toast.error("An error occurred during registration");
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
                    <h1 className="font-heading text-3xl font-bold text-foreground">Create an Account</h1>
                    <p className="text-muted-foreground mt-2">Start managing your finances today</p>
                </div>

                <div className="dashboard-card border border-border">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                                placeholder="John Doe"
                            />
                        </div>
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
                                minLength={6}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 mt-6"
                        >
                            {loading ? "Creating account..." : "Register"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
