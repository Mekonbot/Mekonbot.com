"use client";

import { Hero } from "@/components/hero";
import { TheShift } from "@/components/the-shift";
import { DefiningCategory } from "@/components/defining-category";
import { CoreArchitecture } from "@/components/core-architecture";
import { WarehouseScenario } from "@/components/warehouse-scenario";
import { RevenueArchitecture } from "@/components/revenue-architecture";
import { InfrastructurePlay } from "@/components/infrastructure-play";
import { Roadmap } from "@/components/roadmap";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/ui/section-divider";
import { Leva } from "leva";

export default function Home() {
  return (
    <div className="snap-y snap-proximity">
      <Hero />
      <SectionDivider />
      <TheShift />
      <SectionDivider />
      <DefiningCategory />
      <SectionDivider />
      <CoreArchitecture />
      <SectionDivider />
      <WarehouseScenario />
      <SectionDivider />
      <RevenueArchitecture />
      <SectionDivider />
      <InfrastructurePlay />
      <SectionDivider />
      <Roadmap />
      <SectionDivider />
      <Footer />
      <Leva hidden />
    </div>
  );
}
