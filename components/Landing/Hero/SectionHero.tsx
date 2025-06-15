import { Lamp } from "@/components/Landing/Hero/Lamp";
import { ResumeButton } from "./ResumeButton";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { AILink } from "./AILink";

export function SectionHero({ id }: { id: string }) {
  return (
    <div id={id}>
      <Lamp>
        <h1 className="bg-gradient-to-br text-transparent from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight md:text-5xl lg:text-7xl mb-4">
          My name is Zi Shen <br />
          <br />I bring{" "}
          <LinkPreview
            url="./projects/personal-ai"
            className="text-5xl lg:text-8xl font-bold inline-block"
            isStatic
            imageSrc="/image/preview-personal-ai.png"
          >
            <AILink />
          </LinkPreview>{" "}
          to life
        </h1>
        <ResumeButton />
      </Lamp>
    </div>
  );
}
