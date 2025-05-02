import { DottedBackground } from "@/components/ui/DottedBackground";
import { SectionHeading } from "@/components/Headings/SectionHeading";
import { ProjectDetail } from "@/components/Projects/ProjectDetail";
import { ProjectText } from "@/components/Projects/ProjectText";
import { ProjectHeading } from "@/components/Projects/ProjectHeading";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { SpotlightHero } from "./SpotlightHero";
import { CompareDetail } from "./CompareDetail";

export default function PersonalAiPage() {
  return (
    <DottedBackground>
      <div className="w-full items-center justify-center flex flex-col lg:px-[10dvw]">
        <SpotlightHero />

        <SectionHeading>What Can It Do</SectionHeading>
        <ProjectText className="text-centre">
          Integrate into different parts of ecosystem — like chatbots, apps, or
          web services.
        </ProjectText>
        <ProjectDetail
          videoSrc="/videos/reminder-api.mp4"
          multipleCol={false}
          height="500px"
          width={750}
          className="mb-[20dvh]"
        >
          <ProjectText className="tracking-wider">
            Access your reminders anywhere, anytime.
          </ProjectText>
          <LinkPreview
            className="text-xl lg:text-3xl font-bold py-0"
            url="https://github.com/ZSHenChan/reminderApi"
          >
            Github
          </LinkPreview>
        </ProjectDetail>

        <div className="mb-[15dvh] place-items-center">
          <SectionHeading className="md:text-3xl">Features</SectionHeading>

          <ProjectDetail
            videoSrc="/videos/reminder-api-auth.mp4"
            multipleCol
            height="300px"
            className="place-items-center mb-[10dvh]"
          >
            <ProjectHeading className="lg:text-start">
              Secured Access
            </ProjectHeading>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
              - ASP.NET Core Identity to keep track of current users.
            </ProjectText>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
              - Password authentication for simplified login process.
            </ProjectText>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
              - Encrypted Jwt tokens enable secure transactions and access to
              database.
            </ProjectText>
          </ProjectDetail>

          <ProjectDetail
            videoSrc="/videos/reminder-api-interaction.mp4"
            multipleCol
            height="300px"
            className="place-items-center mb-[10dvh]"
          >
            <ProjectHeading className="lg:text-start">
              AI Integration
            </ProjectHeading>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
              - Persisting tokens allow easy integration with AI to modify
              reminders.
            </ProjectText>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
              - Prioritize urgent tasks by pinning on top, automatically.
            </ProjectText>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
              - Schedule a meeting and remind all the involved attendees.
            </ProjectText>
          </ProjectDetail>

          <CompareDetail
            multipleCol
            firstImage="/image/reminder-api-json-in.jpeg"
            secondImage="/image/reminder-api-json-out.png"
            className="place-items-center mb-[10dvh]"
          >
            <ProjectHeading className="lg:text-start">
              Data Validation
            </ProjectHeading>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
              - Validations should be done before modifying data.
            </ProjectText>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
              - Model State filter detects malformed data and invalid input
              fields.
            </ProjectText>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
              - Detailed reponse is returned to simplify debugging process.
            </ProjectText>
          </CompareDetail>
        </div>

        <div className="mb-[15dvh] place-items-center">
          <SectionHeading className="md:text-3xl mb-8">
            Implementations
          </SectionHeading>
          <CompareDetail
            firstImage="/image/reminder-api-priority-in.jpeg"
            secondImage="/image/reminder-api-priority-out.jpeg"
            className="place-items-center mb-[10dvh]"
            multipleCol
          >
            <ProjectHeading className="lg:text-start">Filters</ProjectHeading>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
              - Data Validation including string length limit, date format and
              enums.
            </ProjectText>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
              - Detect and reject malformed data.
            </ProjectText>
            <LinkPreview
              className="text-xl lg:text-2xl font-bold"
              url="https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/filters?view=aspnetcore-8.0"
            >
              .NET Docs
            </LinkPreview>
          </CompareDetail>

          <ProjectDetail
            height="400px"
            width={600}
            imgSrc="/image/reminder-api-middleware.png"
            multipleCol
          >
            <ProjectHeading className="lg:text-start">
              Middleware
            </ProjectHeading>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
              - Global exception handling and descriptive response return.
            </ProjectText>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
              - Authentication and authorization.
            </ProjectText>
            <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
              - Fully configured CORS, routing and HTTPS redirection.
            </ProjectText>
            <LinkPreview
              className="text-xl lg:text-2xl font-bold"
              url="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-8.0"
            >
              .NET Docs
            </LinkPreview>
          </ProjectDetail>
        </div>
      </div>{" "}
      <div className="h-50"></div>
    </DottedBackground>
  );
}
