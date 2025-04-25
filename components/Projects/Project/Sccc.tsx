import { ProjectHeading } from "../ProjectHeading";
import { ProjectText } from "../ProjectText";
import { ProjectDetail } from "../ProjectDetail";
import { useEffect, useRef } from "react";
import { useRefs } from "@/app/context/RefsContext";

export function ScccProject() {
  const { registerRef } = useRefs();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    registerRef("sccc", sectionRef.current);
  }, [registerRef, sectionRef]);
  return (
    <div ref={sectionRef}>
      <ProjectHeading>SCCC Articulatory Accent Database</ProjectHeading>
      <ProjectDetail videoSrc="/videos/video-sccc.mp4">
        <ProjectText>Collection of Recorded Audios</ProjectText>
      </ProjectDetail>
    </div>
  );
}
