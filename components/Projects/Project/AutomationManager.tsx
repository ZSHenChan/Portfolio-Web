import { useEffect, useRef } from "react";
import { useRefs } from "@/app/context/RefsContext";
import { ProjectHeading } from "../ProjectHeading";
import { ProjectText } from "../ProjectText";
import { ProjectDetail } from "../ProjectDetail";

export function AutomtionManagerProject() {
  const { registerRef } = useRefs();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    registerRef("automation-manager", sectionRef.current);
  }, [registerRef, sectionRef]);
  return (
    <div ref={sectionRef}>
      <ProjectHeading>Automation Manager</ProjectHeading>
      <ProjectDetail videoSrc="/videos/video-portfolio-short.mp4" multipleCol>
        <ProjectText>Automated device signal testing</ProjectText>
        <ProjectText>Demo video coming soon!</ProjectText>
      </ProjectDetail>
    </div>
  );
}
