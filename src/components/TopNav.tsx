import { Bell, Search, ChevronDown } from "lucide-react";

const tabs = ["Overview", "Revenue", "Customers", "Retention"];

interface TopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TopNav({ activeTab, onTabChange }: TopNavProps) {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-8">
        <h1 className="font-heading text-xl font-bold text-foreground">Dashboard</h1>
        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>
        <button className="p-2 rounded-lg hover:bg-secondary transition-colors relative">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-border cursor-pointer">
          <div className="w-8 h-8 rounded-full kpi-gradient-primary flex items-center justify-center">
            <span className="text-xs font-semibold" style={{ color: "white" }}>JD</span>
          </div>
          <span className="text-sm font-medium text-foreground hidden sm:block">John Doe</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
