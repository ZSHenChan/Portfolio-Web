import { SectionTransition } from "@/components/Hero/SectionTransition";
import { TechStack } from "@/components/TechGrid/TechStack";
import { SectionProjects } from "@/components/Projects/SectionProjects";
import { DottedBackground } from "@/components/ui/DottedBackground";
import { SectionContact } from "@/components/Contact/SectionContact";
import { SectionHero } from "@/components/Hero/SectionHero";
import { FloatingNav, navItemInterface } from "@/components/ui/floating-navbar";

const navItems = [
  { name: "Resume", link: "#hero" },
  { name: "Tech Stack", link: "#techstack" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
] as navItemInterface[];

export default function Home() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <SectionHero id="hero" />
      <SectionTransition />
      <TechStack id="techstack" />
      <DottedBackground>
        <SectionProjects id="projects" />
        <SectionContact id="contact" />
      </DottedBackground>
    </>
  );
}
