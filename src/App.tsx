import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Billing from "./pages/Billing";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import HelpSupport from "./pages/HelpSupport";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute />}>
                <Route element={<Index />}>
                  <Route index element={<Dashboard />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="billing" element={<Billing />} />
                  <Route path="income" element={<Income />} />
                  <Route path="expenses" element={<Expenses />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="help" element={<HelpSupport />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
