import { ProjectHeading } from "../ProjectHeading";
import { ProjectText } from "../ProjectText";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { ProjectDetail } from "../ProjectDetail";
import { ScrollableSection } from "@/components/layout/ScrollableSection";
import { useScrollTargetRegistration } from "@/app/context/UIStateContext";

export function XcuisiteProject() {
  const sectionId = "xcuisite";
  useScrollTargetRegistration(sectionId);

  return (
    <ScrollableSection id={sectionId}>
      <ProjectHeading>XCuisite Ecommerce Website</ProjectHeading>
      <ProjectDetail videoSrc="/videos/video-xcuisite-1.mp4" multipleCol>
        <ProjectText>Doughnut e-commerce website</ProjectText>
        <LinkPreview
          className="text-xl lg:text-3xl font-bold"
          url="https://xcuisite.store"
        >
          Link
        </LinkPreview>
      </ProjectDetail>
      <ProjectDetail videoSrc="/videos/video-xcuisite-2.mp4" multipleCol>
        <ProjectText>Effective Cart System With Animations</ProjectText>
      </ProjectDetail>
      <ProjectDetail videoSrc="/videos/video-xcuisite-3.mp4" multipleCol>
        <ProjectText>
          Authentication and Payment Gateway Integration
        </ProjectText>
      </ProjectDetail>
    </ScrollableSection>
  );
}
