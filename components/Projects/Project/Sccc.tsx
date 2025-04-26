import { ProjectHeading } from "../ProjectHeading";
import { ProjectText } from "../ProjectText";
import { ProjectDetail } from "../ProjectDetail";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

export function ScccProject() {
  return (
    <ScrollableSection id="sccc">
      <ProjectHeading>SCCC Articulatory Accent Database</ProjectHeading>
      <ProjectDetail videoSrc="/videos/video-sccc.mp4">
        <ProjectText>Collection of Recorded Audios</ProjectText>
      </ProjectDetail>
    </ScrollableSection>
  );
}
