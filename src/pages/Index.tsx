import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { TopNav } from "@/components/TopNav";

const Index = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Index;
