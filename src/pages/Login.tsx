import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import {
    Check,
    ChevronDown,
    Smartphone,
    Mail,
    KeyRound
} from "lucide-react";

const LANGUAGES = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'IN', name: 'Hindi', flag: '🇮🇳' },
];

type AuthMethod = 'password' | 'email-otp' | 'phone-otp';

export default function Login() {
    // Form States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");

    // UI States
    const [loading, setLoading] = useState(false);
    const [authMethod, setAuthMethod] = useState<AuthMethod>('password');
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
    const [otpSent, setOtpSent] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const langDropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdowns on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
                setShowLangDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (authMethod !== 'password' && !otpSent) {
            // Handle sending OTP (mocked for now)
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setOtpSent(true);
                toast.success(`OTP sent to your ${authMethod === 'email-otp' ? 'email' : 'phone'}`);
            }, 1000);
            return;
        }

        setLoading(true);
        try {
            // If we are using Password
            if (authMethod === 'password') {
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
            } else {
                // If we are verifying an OTP (mocked)
                if (otp === '123456') { // Mock verification
                    // In a real app we would hit an endpoint and get the user token
                    toast.success("OTP verified successfully! (Mocked)");
                    navigate('/'); // Mock redirect
                } else {
                    toast.error("Invalid OTP code. Try 123456");
                }
            }
        } catch (error) {
            toast.error("An error occurred during login");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        toast("Google Login Triggered", {
            description: "Waiting on backend integration instructions to complete this flow."
        });
    }

    return (
        <div className="min-h-screen flex bg-[#0A0B10] text-white">
            {/* Left Side - Image (hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black p-4 pl-0">
                <div className="absolute top-12 left-12 flex items-center gap-3 z-10 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-xl">
                    <img src="/ledgerflow.png" className="w-8 h-8 drop-shadow-md" alt="LedgerFlow Logo" />
                    <span className="font-heading text-2xl font-bold tracking-tight text-white drop-shadow-md">LedgerFlow</span>
                </div>
                <img src="/hero.png" className="w-full h-full object-cover rounded-r-[2rem]" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-transparent rounded-r-[2rem]" />
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 relative">

                {/* Language Switch */}
                <div className="absolute top-8 right-8 hidden sm:block" ref={langDropdownRef}>
                    <div
                        onClick={() => setShowLangDropdown(!showLangDropdown)}
                        className="flex items-center bg-[#1C1D22] hover:bg-[#2A2B32] transition-colors border border-[#2A2B32] rounded-lg px-3 py-1.5 cursor-pointer text-sm"
                    >
                        <span className="mr-2 text-base">{selectedLang.flag}</span>
                        <span className="font-medium text-zinc-300">{selectedLang.code}</span>
                        <ChevronDown className="w-4 h-4 ml-2 text-zinc-500" />
                    </div>

                    {/* Language Dropdown Menu */}
                    {showLangDropdown && (
                        <div className="absolute top-full right-0 mt-2 w-40 bg-[#1C1D22] border border-[#2A2B32] rounded-xl shadow-2xl overflow-hidden z-50">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setSelectedLang(lang);
                                        setShowLangDropdown(false);
                                    }}
                                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#2A2B32] transition-colors text-left"
                                >
                                    <span className="text-base">{lang.flag}</span>
                                    <span className="text-sm text-zinc-300 font-medium">{lang.name}</span>
                                    {selectedLang.code === lang.code && (
                                        <Check className="w-4 h-4 text-[#14F195] ml-auto" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full max-w-[400px]">
                    <h1 className="text-4xl font-bold text-center mb-8">Welcome Back!</h1>

                    {/* Sign Up / Log In Toggle */}
                    <div className="flex bg-[#1C1D22] rounded-xl p-1.5 mb-8 border border-[#2A2B32]">
                        <Link to="/register" className="flex-1 text-center py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            SIGN UP
                        </Link>
                        <div className="flex-1 text-center py-2.5 rounded-lg text-sm font-medium bg-[#2A2B32] text-white shadow-sm">
                            LOG IN
                        </div>
                    </div>

                    {/* Social Login */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-zinc-200 transition-colors mb-6"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-[#2A2B32]"></div>
                        <span className="text-sm text-zinc-500 font-medium">OR</span>
                        <div className="flex-1 h-px bg-[#2A2B32]"></div>
                    </div>

                    {/* Auth Method Toggle */}
                    <div className="flex justify-center gap-3 mb-6">
                        <button
                            onClick={() => { setAuthMethod('password'); setOtpSent(false); }}
                            className={`p-2 rounded-lg transition-colors border ${authMethod === 'password' ? 'bg-[#2A2B32] border-zinc-500 text-white' : 'bg-[#1C1D22] border-[#2A2B32] text-zinc-500 hover:text-white'}`}
                            title="Password Login"
                        >
                            <KeyRound className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => { setAuthMethod('email-otp'); setOtpSent(false); }}
                            className={`p-2 rounded-lg transition-colors border ${authMethod === 'email-otp' ? 'bg-[#2A2B32] border-zinc-500 text-white' : 'bg-[#1C1D22] border-[#2A2B32] text-zinc-500 hover:text-white'}`}
                            title="Email OTP Login"
                        >
                            <Mail className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => { setAuthMethod('phone-otp'); setOtpSent(false); }}
                            className={`p-2 rounded-lg transition-colors border ${authMethod === 'phone-otp' ? 'bg-[#2A2B32] border-zinc-500 text-white' : 'bg-[#1C1D22] border-[#2A2B32] text-zinc-500 hover:text-white'}`}
                            title="Phone OTP Login"
                        >
                            <Smartphone className="w-4 h-4" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* PASSWORD FLOW */}
                        {authMethod === 'password' && (
                            <>
                                <div className=" relative">
                                    <label className="absolute -top-2 left-4 bg-[#0A0B10] px-1 text-xs text-zinc-500 font-medium z-10">Email</label>
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
                                    <label className="absolute -top-2 left-4 bg-[#0A0B10] px-1 text-xs text-zinc-500 font-medium z-10">Password</label>
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
                            </>
                        )}

                        {/* EMAIL OTP FLOW */}
                        {authMethod === 'email-otp' && !otpSent && (
                            <div className="relative">
                                <label className="absolute -top-2 left-4 bg-[#0A0B10] px-1 text-xs text-zinc-500 font-medium z-10">Enter your Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent border border-[#2A2B32] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#14F195] transition-colors"
                                    placeholder="hello@ledgerflow.app"
                                />
                            </div>
                        )}

                        {/* PHONE OTP FLOW */}
                        {authMethod === 'phone-otp' && !otpSent && (
                            <div className="relative">
                                <label className="absolute -top-2 left-4 bg-[#0A0B10] px-1 text-xs text-zinc-500 font-medium z-10">Enter your Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-transparent border border-[#2A2B32] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#14F195] transition-colors"
                                    placeholder="+1 212 555 1234"
                                />
                            </div>
                        )}

                        {/* OTP VERIFICATION STEP */}
                        {(authMethod === 'email-otp' || authMethod === 'phone-otp') && otpSent && (
                            <div className="relative animate-in fade-in slide-in-from-bottom-2">
                                <label className="absolute -top-2 left-4 bg-[#0A0B10] px-1 text-xs text-[#14F195] font-medium z-10">Enter 6-digit Code</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // numbers only
                                    className="w-full bg-transparent border border-[#14F195] rounded-xl px-4 py-3.5 text-white text-center tracking-[0.5em] focus:outline-none focus:ring-1 focus:ring-[#14F195] transition-shadow text-lg font-mono"
                                    placeholder="000000"
                                />
                                <div className="text-right mt-2 text-xs text-zinc-500 hover:text-white cursor-pointer transition-colors" onClick={() => setOtpSent(false)}>
                                    Change contact info
                                </div>
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={
                                    loading ||
                                    (authMethod === 'password' && (!email.includes("@") || password.length < 8)) ||
                                    (authMethod === 'email-otp' && !otpSent && !email.includes("@")) ||
                                    (authMethod === 'phone-otp' && !otpSent && phone.length < 5) ||
                                    ((authMethod === 'email-otp' || authMethod === 'phone-otp') && otpSent && otp.length !== 6)
                                }
                                className="w-full bg-[#14F195] text-[#0A0B10] font-bold py-3.5 rounded-xl hover:bg-[#12D886] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 mt-4 active:scale-95 shadow-[0_0_15px_rgba(20,241,149,0.3)]"
                            >
                                {loading ? "Please wait..." : (authMethod === 'password' ? "Log in" : (otpSent ? "Verify Code" : "Send Code"))}
                            </button>
                        </div>
                    </form>

                    {authMethod === 'password' && (
                        <div className="mt-8 text-center flex flex-col items-center gap-1.5 text-sm">
                            <span className="text-zinc-500">Demo Account:</span>
                            <span className="bg-[#1C1D22] border border-[#2A2B32] px-3 py-1 rounded text-zinc-300 font-mono text-xs">demo@ledgerflow.app</span>
                            <span className="bg-[#1C1D22] border border-[#2A2B32] px-3 py-1 rounded text-zinc-300 font-mono text-xs">password123</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
