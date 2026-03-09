import { useState } from "react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { TopNav } from "@/components/TopNav";
import { KPICards } from "@/components/KPICards";
import { ConversionBars } from "@/components/ConversionBars";
import { MAUChart } from "@/components/MAUChart";
import { RetentionAnalysis } from "@/components/RetentionAnalysis";
import { ProjectedLTV } from "@/components/ProjectedLTV";
import { AcquisitionChannels } from "@/components/AcquisitionChannels";

const Index = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* KPI Row */}
            <KPICards />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MAUChart />
              </div>
              <div className="space-y-6">
                <ConversionBars />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <RetentionAnalysis />
              <ProjectedLTV />
              <AcquisitionChannels />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
