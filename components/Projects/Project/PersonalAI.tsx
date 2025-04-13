import { ProjectHeading } from "../ProjectHeading";
import { ProjectText } from "../ProjectText";
import { ProjectDetail } from "../ProjectDetail";

function PersonalAIProject() {
  return (
    <div>
      <ProjectHeading>Personal AI Assistant</ProjectHeading>
      <ProjectDetail
        videoSrc="/videos/video-portfolio-short.mp4"
        multipleCol={false}
      >
        <ProjectText>
          Fine-tuned AI to handle questions regarding my portfolio website.
        </ProjectText>
        <ProjectText>This is just one of my trained AI!</ProjectText>
      </ProjectDetail>
      <ProjectDetail
        videoSrc="/videos/video-portfolio-email.mp4"
        multipleCol={false}
      >
        <ProjectText>Ask my AI to email for you!</ProjectText>
      </ProjectDetail>
      <ProjectDetail
        videoSrc="/videos/video-portfolio-scroll.mp4"
        multipleCol={false}
      >
        <ProjectText>Navigation for visitors</ProjectText>
      </ProjectDetail>
    </div>
  );
}

export { PersonalAIProject };
