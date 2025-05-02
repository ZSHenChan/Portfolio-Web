import { SectionTransition } from "@/components/Hero/SectionTransition";
import { InfiniteMovingCardsGrid } from "@/components/TechGrid/InfiniteMovingCardsGrid";
import { SectionProjects } from "@/components/Projects/SectionProjects";
import { DottedBackground } from "@/components/ui/DottedBackground";
import { SectionContact } from "@/components/Contact/SectionContact";
import { SectionHero } from "@/components/Hero/SectionHero";

export default function Home() {
  return (
    <>
      <SectionHero />
      <SectionTransition />
      <InfiniteMovingCardsGrid />
      <DottedBackground>
        <SectionProjects />
        <SectionContact />
      </DottedBackground>
    </>
  );
}
