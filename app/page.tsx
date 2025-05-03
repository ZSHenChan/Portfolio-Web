import { TechStack } from "@/components/Landing/TechGrid/TechStack";
import { SectionProjects } from "@/components/Projects/SectionProjects";
import { DottedBackground } from "@/components/ui/DottedBackground";
import { SectionContact } from "@/components/Contact/SectionContact";
import { SectionHero } from "@/components/Landing/Hero/SectionHero";
import { FloatingNav, navItemInterface } from "@/components/ui/floating-navbar";
import { About } from "@/components/Landing/About";

const navItems = [
  { name: "About", link: "#about" },
  { name: "Tech Stack", link: "#techstack" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
] as navItemInterface[];

export default function Home() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <SectionHero id="hero" />
      <div className="h-[10rem] bg-gradient-to-b from-slate-950 to-transparent" />
      <About id="about" />
      <TechStack id="techstack" />
      <DottedBackground>
        <SectionProjects id="projects" />
        <SectionContact id="contact" />
      </DottedBackground>
    </>
  );
}
