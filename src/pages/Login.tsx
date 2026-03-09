import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { Check, ChevronDown } from "lucide-react";

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
        <div className="min-h-screen flex bg-[#0A0B10] text-white">
            {/* Left Side - Image (hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black p-4 pl-0">
                <div className="absolute top-12 left-12 flex items-center gap-3 z-10">
                    <img src="/ledgerflow.png" className="w-8 h-8" alt="LedgerFlow Logo" />
                    <span className="font-heading text-2xl font-bold">LedgerFlow</span>
                </div>
                <img src="/hero.png" className="w-full h-full object-cover rounded-r-[2rem]" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-transparent rounded-r-[2rem]" />
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 relative">
                {/* Language Switch */}
                <div className="absolute top-8 right-8 hidden sm:flex items-center bg-[#1C1D22] border border-[#2A2B32] rounded-lg px-3 py-1.5 cursor-pointer text-sm">
                    <span className="mr-2">🇺🇸</span> EN <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                </div>

                <div className="w-full max-w-[400px]">
                    <h1 className="text-4xl font-bold text-center mb-8">Welcome to LedgerFlow!</h1>

                    {/* Toggle */}
                    <div className="flex bg-[#1C1D22] rounded-xl p-1.5 mb-8 border border-[#2A2B32]">
                        <Link to="/register" className="flex-1 text-center py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            SIGN UP
                        </Link>
                        <div className="flex-1 text-center py-2.5 rounded-lg text-sm font-medium bg-[#2A2B32] text-white shadow-sm">
                            LOG IN
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <label className="absolute -top-2 left-4 bg-[#0A0B10] px-1 text-xs text-zinc-500 font-medium z-10">Email (Login)</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border border-[#2A2B32] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#14F195] transition-colors peer"
                                placeholder="hello@ledgerflow.app"
                            />
                            {email.includes("@") && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#14F195] rounded-md flex items-center justify-center">
                                    <Check className="w-4 h-4 text-black font-bold" />
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <label className="absolute -top-2 left-4 bg-[#0A0B10] px-1 text-xs text-zinc-500 font-medium z-10">Password must contain 8 characters or more</label>
                            <input
                                type="password"
                                required
                                minLength={8}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border border-[#2A2B32] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#14F195] transition-colors"
                                placeholder="••••••••"
                            />
                            {password.length >= 8 && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#14F195] rounded-md flex items-center justify-center">
                                    <Check className="w-4 h-4 text-black font-bold" />
                                </div>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading || !email.includes("@") || password.length < 8}
                                className="w-full bg-[#14F195] text-[#0A0B10] font-bold py-3.5 rounded-xl hover:bg-[#12D886] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 mt-4 active:scale-95"
                            >
                                {loading ? "Logging in..." : "Log in"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-sm text-zinc-500">
                        Demo Account: demo@ledgerflow.app / password123
                    </div>
                </div>
            </div>
        </div>
    );
}
