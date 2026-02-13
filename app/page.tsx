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
import { Team } from "@/components/team";
import { WhoAreWe } from "@/components/who-are-we";
import { BackgroundLayer } from "@/components/background-layer";

export default function Home() {
  return (
    <div className="snap-y snap-proximity relative z-10">
      <BackgroundLayer />
      <Hero />
      <SectionDivider />
      <WhoAreWe />
      <SectionDivider />
      <TheShift /> {/* Context/Problem */}
      <SectionDivider />
      <DefiningCategory /> {/* The Solution Concept */}
      <SectionDivider />
      <CoreArchitecture /> {/* How it Works */}
      <SectionDivider />
      <WarehouseScenario /> {/* Proof by Example */}
      <SectionDivider />
      <InfrastructurePlay /> {/* Market Opportunity */}
      <SectionDivider />
      <RevenueArchitecture /> {/* Business Model */}
      <SectionDivider />
      <Roadmap /> {/* Timeline */}
      <SectionDivider />
      <Team />
      <SectionDivider />
      <Footer />
    </div>
  );
}
