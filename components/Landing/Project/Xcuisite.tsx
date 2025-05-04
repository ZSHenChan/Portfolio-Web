import { ProjectHeading } from "../../Projects/ProjectHeading";
import { ProjectText } from "../../Projects/ProjectText";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { ProjectDetail } from "../../Projects/ProjectDetail";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

export function XcuisiteProject() {
  return (
    <ScrollableSection id="xcuisite">
      <ProjectHeading>XCuisite Ecommerce Website</ProjectHeading>
      <ProjectDetail videoSrc="/videos/xcuisite/main-preview.mp4" multipleCol>
        <ProjectText>Doughnut e-commerce website</ProjectText>
        <LinkPreview
          className="text-xl lg:text-3xl font-bold"
          url="https://xcuisite.store"
        >
          Link
        </LinkPreview>
      </ProjectDetail>
      <ProjectDetail videoSrc="/videos/xcuisite/cart-preview.mp4" multipleCol>
        <ProjectText>Effective Cart System With Animations</ProjectText>
      </ProjectDetail>
      <ProjectDetail
        videoSrc="/videos/xcuisite/payment-preview.mp4"
        multipleCol
      >
        <ProjectText>
          Authentication and Payment Gateway Integration
        </ProjectText>
      </ProjectDetail>
    </ScrollableSection>
  );
}
