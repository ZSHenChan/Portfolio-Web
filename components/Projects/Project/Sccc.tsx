import { ProjectHeading } from "../ProjectHeading";
import { ProjectText } from "../ProjectText";
import { ProjectDetail } from "../ProjectDetail";

export function ScccProject() {
  return (
    <div>
      <ProjectHeading>SCCC Articulatory Accent Database</ProjectHeading>
      <ProjectDetail videoSrc="/videos/video-sccc.mp4">
        <ProjectText>Collection of Recorded Audios</ProjectText>
      </ProjectDetail>
    </div>
  );
}
