import { ProjectHeading } from "../ProjectHeading";
import { ProjectText } from "../ProjectText";
import { ProjectDetail } from "../ProjectDetail";

export function AutomtionManagerProject() {
  return (
    <div>
      <ProjectHeading>Automation Manager</ProjectHeading>
      <ProjectDetail videoSrc="/videos/video-portfolio-short.mp4" multipleCol>
        <ProjectText>
          Automated 5G signal testing powered by .NET gRPC and Consul
        </ProjectText>
        <ProjectText>Demo video coming soon!</ProjectText>
      </ProjectDetail>
    </div>
  );
}
