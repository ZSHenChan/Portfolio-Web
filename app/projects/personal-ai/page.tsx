import { DottedBackground } from "@/components/ui/DottedBackground";
import { SectionHeading } from "@/components/Headings/SectionHeading";
import { ProjectDetail } from "@/components/Projects/ProjectDetail";
import { ProjectText } from "@/components/Projects/ProjectText";
import { ProjectHeading } from "@/components/Projects/ProjectHeading";
import Image from "next/image";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import Link from "next/link";

export default function ProjectPage() {
  return (
    <DottedBackground>
      <div className="w-full items-center justify-center flex flex-col lg:px-[10dvw]">
        <SectionHeading className="md:text-5xl">
          Meet My Personal AI Assistant
        </SectionHeading>
        <ProjectDetail
          videoSrc="/videos/meet-my-personal-assistant.mp4"
          multipleCol={false}
          height="500px"
          className="mb-[20dvh]"
        >
          <LinkPreview
            className="text-xl lg:text-3xl font-bold py-0"
            url="https://github.com/ZSHenChan/Portfolio-Web"
          >
            Github
          </LinkPreview>
        </ProjectDetail>

        <div className="mb-[15dvh] place-items-center">
          <SectionHeading className="md:text-3xl">Features</SectionHeading>
          <ProjectText className="text-center text-slate-400 mb-[10dvh]">
            Thanks to function calling, my AI can now perform complex tasks
            under text prompt.
          </ProjectText>

          <ProjectDetail
            videoSrc="/videos/video-portfolio-scroll.mp4"
            multipleCol
            height="300px"
            className="place-items-center mb-[10dvh]"
          >
            <ProjectHeading className="lg:text-start">
              Navigation
            </ProjectHeading>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
              - Scrolling to target section upon request.
              <br />- How? simply input &quot;bring me to projects section&quot;
              !
            </ProjectText>
          </ProjectDetail>

          <ProjectDetail
            videoSrc="/videos/video-portfolio-email.mp4"
            multipleCol
            height="300px"
            className="place-items-center mb-[10dvh]"
          >
            <ProjectHeading className="lg:text-start">
              Email Sending
            </ProjectHeading>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
              - Send an email on behalf of visitor.
              <br />- It is always better to have someone to do the job for you.
              !
            </ProjectText>
          </ProjectDetail>

          <ProjectText>More Coming Soon...</ProjectText>
        </div>

        <div className="mb-[15dvh] place-items-center">
          <SectionHeading className="md:text-3xl">Workflows</SectionHeading>
          <Image
            width={600}
            height={300}
            src="/image/workflow.png"
            alt="Workflow Demo diagram"
            className="mb-12"
          ></Image>
          <ProjectText className="text-center max-w-[70ch]">
            Beyond Basic Prompts: Pipeline combining semantic context retrieval
            and function execution allows LLMs to handle complex requests and
            provide reliable answers.
          </ProjectText>
        </div>

        <ProjectDetail
          imgSrc="/image/semantic-search.png"
          multipleCol
          className="place-items-center mb-[10dvh]"
        >
          <ProjectHeading className="lg:text-start">
            RAG Semantic Searching
          </ProjectHeading>
          <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
            - Create embeddings, indexing data and perform meaningful search to
            extract needed information.
            <br />- Use LLMs to generate responses based on the retrieved data.
          </ProjectText>
          {/* <p className="text-start mb-12">image source: txtai</p> */}
          <LinkPreview
            className="text-xl lg:text-2xl font-bold"
            url="https://github.com/neuml/txtai"
          >
            txtai
          </LinkPreview>
        </ProjectDetail>

        <ProjectDetail
          imgSrc="/image/function-call.png"
          width={700}
          multipleCol
          className="place-items-center"
        >
          <ProjectHeading className="lg:text-start">
            Function Calling
          </ProjectHeading>
          <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
            - Predefined functions to handle specific tasks.
            <br />- Receive parameter values from Function Calling Model.
          </ProjectText>
          <LinkPreview
            className="text-xl lg:text-2xl font-bold"
            url="https://ai.google.dev/gemini-api/docs/function-calling?example=meeting"
          >
            Gemini Ai
          </LinkPreview>
        </ProjectDetail>
        <Link
          href="/"
          className="text-center lg:text-start text-lg lg:text-3xl font-bold w-full lg:ml-[12dvw] mt-12 underline"
        >
          Back
        </Link>
      </div>

      <div className="h-50"></div>
    </DottedBackground>
  );
}
