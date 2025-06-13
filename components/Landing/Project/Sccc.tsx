import { ProjectHeading } from "../../Projects/ProjectHeading";
import { ProjectText } from "../../Projects/ProjectText";
import { ProjectDetail } from "../../Projects/ProjectDetail";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

export function ScccProject() {
  return (
    <ScrollableSection id="sccc">
      <ProjectHeading>SCCC Articulatory Accent Database</ProjectHeading>
      <ProjectDetail className="sm:text-center" videoSrc="/videos/sccc.mp4">
        <ProjectText>Collection of Recorded Audios</ProjectText>
      </ProjectDetail>
    </ScrollableSection>
  );
}
