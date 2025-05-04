import { ProjectHeading } from "../../Projects/ProjectHeading";
import { ProjectText } from "../../Projects/ProjectText";
import { ProjectDetail } from "../../Projects/ProjectDetail";
import { ScrollableSection } from "@/components/layout/ScrollableSection";
// import { LinkPreview } from "@/components/Contact/LinkPreview";

export function AutomtionManagerProject() {
  return (
    <ScrollableSection id="automation-manager">
      <ProjectHeading>Internship - Rohde &amp; Schwarz</ProjectHeading>
      <ProjectDetail imgSrc="/image/am.jpeg" width={600}>
        <ProjectHeading className="lg:text-2xl font-bold">
          Automation Manager
        </ProjectHeading>
        <ProjectText>
          Web platform for automating Android device testing and result
          analysis.
        </ProjectText>
        {/* <LinkPreview
          url="/projects/automation-manager"
          className="text-xl lg:text-3xl font-bold"
          isStatic
          imageSrc="/image/preview-am"
        >
          Learn More
        </LinkPreview> */}
      </ProjectDetail>
    </ScrollableSection>
  );
}
