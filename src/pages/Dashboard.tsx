import { useState } from "react";
import { KPICards } from "@/components/KPICards";
import { ConversionBars } from "@/components/ConversionBars";
import { MAUChart } from "@/components/MAUChart";
import { RetentionAnalysis } from "@/components/RetentionAnalysis";
import { ProjectedLTV } from "@/components/ProjectedLTV";
import { AcquisitionChannels } from "@/components/AcquisitionChannels";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <KPICards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MAUChart />
        </div>
        <div className="space-y-6">
          <ConversionBars />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RetentionAnalysis />
        <ProjectedLTV />
        <AcquisitionChannels />
      </div>
    </div>
  );
}
