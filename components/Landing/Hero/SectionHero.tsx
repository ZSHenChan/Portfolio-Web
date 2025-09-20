import { cn } from "@/lib/utils";
import { Lamp } from "@/components/Landing/Hero/Lamp";
import { ResumeButton } from "./ResumeButton";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { AILink } from "./AILink";
import { FadeUpInView } from "@/components/ui/FadeUpInView";

export function SectionHero({ id }: { id: string }) {
  return (
    <div id={id}>
      <Lamp>
        <h1
          className={cn(
            "bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight md:text-5xl lg:text-7xl mb-4 "
          )}
        >
          <span className={cn("hero-text")}>
            My name is Zi Shen <br />
            <br />I bring{" "}
          </span>
          <LinkPreview
            url="./projects/personal-ai"
            className={cn(
              "relative text-5xl lg:text-8xl font-bold inline-block"
            )}
            isStatic
            imageSrc="/image/preview-personal-ai.png"
          >
            <AILink />
          </LinkPreview>{" "}
          <span className={cn("hero-text")}>to life</span>
        </h1>
        <FadeUpInView delay={3.5} initialOpacity={0} className="text-center">
          <ResumeButton />
        </FadeUpInView>
      </Lamp>
    </div>
  );
}
