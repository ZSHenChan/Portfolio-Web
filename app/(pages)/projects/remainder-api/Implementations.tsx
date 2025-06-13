"use client";

import { SectionHeading } from "@/components/Headings/SectionHeading";
import { ProjectDetail } from "@/components/Projects/ProjectDetail";
import { ProjectText } from "@/components/Projects/ProjectText";
import { ProjectHeading } from "@/components/Projects/ProjectHeading";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { CodeDetail } from "@/components/layout/CodeDetail";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

export function Implementations({ id }: { id: string }) {
  return (
    <>
      <ScrollableSection id={id} className="mb-[15dvh] place-items-center">
        <SectionHeading className="md:text-3xl mb-16">
          Implementations
        </SectionHeading>

        <ProjectHeading className="md:text-3xl">
          Filters - Model State
        </ProjectHeading>
        <CodeDetail
          language="cs"
          filename="CreateReminderRequestDto.cs"
          code={`[DefaultValue("My Reminder Title")]
[Required(ErrorMessage = "{0} is required.")]
[MaxLength(50, ErrorMessage = "The title must not excess 50 characters long.")]
public required string Title { get; set; }

[DefaultValue("Describe your reminder")]
[MaxLength(100, ErrorMessage = "{0} must not exceed {1} characters long.")]
public string Description { get; set; }

[CustomValidation(typeof(DueDateValidator), nameof(DueDateValidator.ValidateFutureDate))]
[DefaultValue("2025-04-05")]
public DateOnly? DueDate { get; set; }`}
          highlightLines={[4, 8, 12]}
          className="mb-32"
        >
          <ProjectText className="place-self-center text-center max-w-[50ch]">
            Handles input format and JSON exceptions with short-circuiting
            before requests reach the controllers.
          </ProjectText>
        </CodeDetail>

        <ProjectHeading className="md:text-3xl mb-12">
          Middlewares
        </ProjectHeading>
        <CodeDetail
          language="cs"
          filename="GlobalExceptionHandlingMiddleware.cs"
          code={`catch (SqlException ex)
{
  logger.LogError("SQL error occurred: {Exception}", ex.Message);
  await WriteErrorResponseAsync(
    context,
    StatusCodes.Status500InternalServerError,
    "Database offline. Please try again later."
  );
}
catch (DbUpdateException ex)
{
  logger.LogError("Error update database: {Exception}", ex.Message);
  await WriteErrorResponseAsync(
    context,
    StatusCodes.Status500InternalServerError,
    "Unable to update Database. Please try again later."
  );
}`}
          multipleCol
          className="mb-16"
        >
          <ProjectHeading className="lg:text-start">
            Global Exception Handling
          </ProjectHeading>
          <ProjectText className="sm:mb-4">
            - Handles exception globally (even within controllers) - Reduced
            nested try blocks.
          </ProjectText>
          <ProjectText className="sm:mb-4">
            - Returns relevant message to user when exceptions are triggered.
          </ProjectText>
        </CodeDetail>

        <CodeDetail
          language="cs"
          filename="Program.cs"
          code={`builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "DefaultCorsPolicy",
        builder =>
        {
            builder
                .WithOrigins(ALLOWED_CORS_ORIGINS)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        }
    );
});

WebApplication app = builder.Build();
app.UseCors("DefaultCorsPolicy");

app.UseAuthentication();
app.UseAuthorization();`}
          multipleCol
          className="mb-16"
        >
          <ProjectHeading className="lg:text-start">
            Access Control and Security Policies
          </ProjectHeading>
          <ProjectText className="sm:mb-4">
            - Configured CORS to manage cross-origin requests, enabling secure
            frontend integration.
          </ProjectText>
          <ProjectText className="sm:mb-4">
            - Authentication and Authorization.
          </ProjectText>
          <ProjectText>
            - Implemented rate limiting as a safety precaution.
          </ProjectText>
          <div className="text-center">
            <LinkPreview
              className="text-xl lg:text-2xl font-bold"
              url="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-8.0"
            >
              .NET Documentations
            </LinkPreview>
          </div>
        </CodeDetail>

        <ProjectDetail
          height="400px"
          width={600}
          imgSrc="/image/reminder-api-imp-middleware3.png"
          multipleCol
        >
          <ProjectHeading className="lg:text-start">
            Request Routing &amp; Config.
          </ProjectHeading>
          <ProjectText className="sm:mb-4">
            - UseHttpsRedirection - redirects http to https connection for more
            security.
          </ProjectText>
          <ProjectText className="sm:mb-4">
            - MapControllers routes incoming requests to the appropriate
            controller actions, enabling easy extension with new features.
          </ProjectText>
        </ProjectDetail>
      </ScrollableSection>
      <LinkPreview
        className="text-xl lg:text-4xl font-bold"
        url="https://github.com/ZSHenChan/Portfolio-Web"
      >
        Github
      </LinkPreview>
    </>
  );
}
