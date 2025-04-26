import { ProjectHeading } from "../ProjectHeading";
import { ProjectText } from "../ProjectText";
import { ProjectDetail } from "../ProjectDetail";
import { ScrollableSection } from "@/components/layout/ScrollableSection";
import { useScrollTargetRegistration } from "@/app/context/UIStateContext";

export function ScccProject() {
  const sectionId = "reminder-api";
  useScrollTargetRegistration(sectionId);

  return (
    <ScrollableSection id={sectionId}>
      <ProjectHeading>SCCC Articulatory Accent Database</ProjectHeading>
      <ProjectDetail videoSrc="/videos/video-sccc.mp4">
        <ProjectText>Collection of Recorded Audios</ProjectText>
      </ProjectDetail>
    </ScrollableSection>
  );
}
