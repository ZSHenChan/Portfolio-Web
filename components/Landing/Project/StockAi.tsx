"use client";
import { ProjectHeading } from "../../Projects/ProjectHeading";
import { ProjectText } from "../../Projects/ProjectText";
import { ProjectDetail } from "../../Projects/ProjectDetail";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

function StockAiProject() {
  return (
    <ScrollableSection id="stock-ai">
      <ProjectHeading>StockAI</ProjectHeading>
      <ProjectDetail
        videoSrc="/videos/stockAI/stockai-preview.mp4"
        className="sm:text-center"
      >
        <ProjectText className="mb-2">
          All-in-one CLI for stock research
        </ProjectText>
        <LinkPreview
          url="./projects/stock-ai"
          className="text-xl lg:text-3xl font-bold"
          isStatic
          imageSrc="/image/preview-stockai.png"
        >
          Learn More
        </LinkPreview>
      </ProjectDetail>
    </ScrollableSection>
  );
}

export { StockAiProject };
