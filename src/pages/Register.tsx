import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { Check, ChevronDown } from "lucide-react";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreeTerms) {
            toast.error("You must agree to the Terms and Risk statements");
            return;
        }

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
                navigate("/");
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
        <div className="min-h-screen flex bg-[#0A0B10] text-white">
            {/* Left Side - Image (hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black p-4 pl-0">
                <div className="absolute top-12 left-12 flex items-center gap-3 z-10">
                    <img src="/ledgerflow.png" className="w-8 h-8" alt="LedgerFlow Logo" />
                    <span className="font-heading text-2xl font-bold">LedgerFlow</span>
                </div>
                <img src="/hero.png" className="w-full h-full object-cover rounded-r-[2rem]" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10]/80 via-transparent to-transparent rounded-r-[2rem]" />
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
                        <div className="flex-1 text-center py-2.5 rounded-lg text-sm font-medium bg-[#2A2B32] text-white shadow-sm">
                            SIGN UP
                        </div>
                        <Link to="/login" className="flex-1 text-center py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            LOG IN
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <label className="absolute -top-2 left-4 bg-[#0A0B10] px-1 text-xs text-zinc-500 font-medium z-10">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent border border-[#2A2B32] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#14F195] transition-colors"
                                placeholder="Jonas Davies"
                            />
                            {name.length > 2 && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#14F195] rounded-md flex items-center justify-center">
                                    <Check className="w-4 h-4 text-black font-bold" />
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <label className="absolute -top-2 left-4 bg-[#0A0B10] px-1 text-xs text-zinc-500 font-medium z-10">Email (Login)</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border border-[#2A2B32] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#14F195] transition-colors"
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

                        {/* Telephone / Select similar to image for realism */}
                        <div className="relative flex">
                            <div className="flex items-center gap-2 bg-transparent border border-[#2A2B32] border-r-0 rounded-l-xl px-4 py-3.5 text-white cursor-pointer hover:bg-[#1C1D22]">
                                <span>🇺🇸 <span className="text-zinc-400 text-sm pl-1">+1</span></span>
                                <ChevronDown className="w-3 h-3 text-zinc-500" />
                            </div>
                            <input
                                type="tel"
                                className="flex-1 bg-transparent border border-[#2A2B32] rounded-r-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#14F195] transition-colors"
                                placeholder="212 555 4567"
                            />
                        </div>

                        {/* Currency equivalent (optional detail from image) */}
                        <div className="relative flex">
                            <div className="w-full flex items-center justify-between border border-[#2A2B32] bg-transparent rounded-xl px-4 py-3 text-white cursor-pointer">
                                <span><span className="font-semibold text-white mr-1">USD</span> <span className="text-zinc-500">(Account currency)</span></span>
                                <ChevronDown className="w-4 h-4 text-zinc-500" />
                            </div>
                        </div>

                        <div className="flex items-start gap-4 pt-4">
                            <div
                                className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center mt-0.5 cursor-pointer transition-colors ${agreeTerms ? 'bg-[#14F195]' : 'bg-[#1C1D22] border border-[#2A2B32]'}`}
                                onClick={() => setAgreeTerms(!agreeTerms)}
                            >
                                {agreeTerms && <Check className="w-3.5 h-3.5 text-black font-bold" />}
                            </div>
                            <span className="text-sm text-zinc-300 cursor-pointer select-none leading-relaxed" onClick={() => setAgreeTerms(!agreeTerms)}>
                                I have read and agree <span className="text-white hover:underline underline-offset-2">Terms and Risk statements</span>
                            </span>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading || !agreeTerms || !email.includes("@") || password.length < 8 || name.length < 3}
                                className="w-full bg-[#14F195] text-[#0A0B10] font-bold py-3.5 rounded-xl hover:bg-[#12D886] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 active:scale-95"
                            >
                                {loading ? "Signing up..." : "Sign up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
