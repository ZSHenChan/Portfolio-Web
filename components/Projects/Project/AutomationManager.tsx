import { ProjectHeading } from "../ProjectHeading";
import { ProjectText } from "../ProjectText";
import { ProjectDetail } from "../ProjectDetail";
import { ScrollableSection } from "@/components/layout/ScrollableSection";
import { useScrollTargetRegistration } from "@/app/context/UIStateContext";

export function AutomtionManagerProject() {
  const sectionId = "automation-manager";
  useScrollTargetRegistration(sectionId);

  return (
    <ScrollableSection id={sectionId}>
      <ProjectHeading>Automation Manager</ProjectHeading>
      <ProjectDetail videoSrc="/videos/video-portfolio-short.mp4" multipleCol>
        <ProjectText>Automated device signal testing</ProjectText>
        <ProjectText>Demo video coming soon!</ProjectText>
      </ProjectDetail>
    </ScrollableSection>
  );
}
