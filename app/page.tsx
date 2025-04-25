import { Lamp } from "@/components/Hero/Lamp";
import { SectionTransition } from "@/components/Hero/SectionTransition";
import { InfiniteMovingCardsGrid } from "@/components/TechGrid/InfiniteMovingCardsGrid";
import { SectionProjects } from "@/components/Projects/SectionProjects";
import { DottedBackground } from "@/components/ui/DottedBackground";
import { SectionContact } from "@/components/Contact/SectionContact";
import { CustomToaster } from "./utils/Toaster";

export default function Home() {
  return (
    <>
      <CustomToaster />
      <Lamp></Lamp>
      <SectionTransition />
      <InfiniteMovingCardsGrid />
      <DottedBackground>
        <SectionProjects />
        <SectionContact />
      </DottedBackground>
    </>
  );
}
