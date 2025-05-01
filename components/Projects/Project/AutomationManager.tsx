import { ProjectHeading } from "../ProjectHeading";
import { ProjectText } from "../ProjectText";
import { ProjectDetail } from "../ProjectDetail";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

export function AutomtionManagerProject() {
  return (
    <ScrollableSection id="automation-manager">
      <ProjectHeading>Automation Manager</ProjectHeading>
      <ProjectDetail videoSrc="/videos/portfolio-short.mp4" multipleCol>
        <ProjectText>Automated device signal testing</ProjectText>
        <ProjectText>Demo video coming soon!</ProjectText>
      </ProjectDetail>
    </ScrollableSection>
  );
}
