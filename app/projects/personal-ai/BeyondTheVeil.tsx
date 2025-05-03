"use client";

import { SectionHeading } from "@/components/Headings/SectionHeading";
import { ProjectDetail } from "@/components/Projects/ProjectDetail";
import { ProjectHeading } from "@/components/Projects/ProjectHeading";
import { ProjectText } from "@/components/Projects/ProjectText";
import { LinkPreview } from "@/components/Contact/LinkPreview";
import { ScrollableSection } from "@/components/layout/ScrollableSection";
import { CodeDetail } from "@/components/layout/CodeDetail";

export const BeyondTheVeil = ({ id }: { id: string }) => {
  return (
    <ScrollableSection id={id}>
      <SectionHeading className="md:text-3xl mb-0">
        Beyond The Veil
      </SectionHeading>
      <ProjectText className="text-center mb-16">
        where magic happens
      </ProjectText>

      <ProjectDetail
        imgSrc="/image/semantic-search.png"
        width={600}
        multipleCol
        className="place-items-center mb-[10dvh]"
      >
        <ProjectHeading className="lg:text-start">
          Contextualization
        </ProjectHeading>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
          - User query and chat history are processed by a dedicated LLM
          (Summary Agent).
        </ProjectText>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
          - A refined query enriched with conversational context is returned to
          assist semantic searching and function retrieval.
        </ProjectText>
        <span className="text-center">
          image source:{" "}
          <LinkPreview
            className="text-xl lg:text-2xl font-bold"
            url="https://github.com/neuml/txtai"
          >
            txtai
          </LinkPreview>
        </span>
      </ProjectDetail>

      <ProjectDetail
        imgSrc="/image/azure-function-app2.png"
        multipleCol
        width={600}
        className="place-items-center mb-[10dvh]"
      >
        <ProjectHeading className="lg:text-start">
          Parallel Processing: RAG
        </ProjectHeading>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
          - Contextualized query is sent to Azure Function App for{" "}
          <strong>
            <u>semantic searching</u>
          </strong>
          .
        </ProjectText>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
          - Concurrently, the contextualized query is analyzed by another
          specialized LLM (Function Call Agent).
        </ProjectText>
        <LinkPreview
          className="text-xl lg:text-2xl font-bold"
          url="https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview"
        >
          Azure Functions
        </LinkPreview>
      </ProjectDetail>

      <CodeDetail
        language="ts"
        filename="functionCalls.ts"
        code={`const navigateProjectsDeclaration: FunctionDeclaration = {
  name: "navigateProjects",
  parameters: {
    type: Type.OBJECT,
    description: "navigate user to a specific project.",
    properties: {
      project: {
        type: Type.STRING,
        description:
          "The target project to navigate to.",
        enum: [
          "projects",
          "personal-assistant"
        ],
      },
    },
    required: ["project"],
  },
};`}
        highlightLines={[2, 5, 17]}
        multipleCol
        className="place-items-center mb-[10dvh]"
      >
        <ProjectHeading className="lg:text-start">
          Parallel Processing: Function Intent
        </ProjectHeading>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
          - Predefined functions with required parameters and context to handle
          specific tasks.
        </ProjectText>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
          - The LLM determines when to use a function and extracts parameters
          from the user&apos;s prompt
        </ProjectText>

        <LinkPreview
          className="text-xl lg:text-2xl font-bold"
          url="https://ai.google.dev/gemini-api/docs/function-calling?example=meeting"
        >
          Gemini AI
        </LinkPreview>
      </CodeDetail>

      <ProjectDetail
        imgSrc="/image/prompt-engineering.png"
        multipleCol
        width={600}
        className="place-items-center mb-[10dvh]"
      >
        <ProjectHeading className="lg:text-start">
          Final Synthesis
        </ProjectHeading>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
          - All the necessary information is gathered and ready to be crafted
          into final prompt.
        </ProjectText>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
          - A final api request is sent to obtain a conversational response.
        </ProjectText>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
          - Executes function call retrieved earlier and simultaneously update
          chat window.
        </ProjectText>
      </ProjectDetail>

      <LinkPreview
        className="w-full place-self-center text-xl lg:text-3xl font-bold py-0"
        url="https://github.com/ZSHenChan/Portfolio-Web"
      >
        Github
      </LinkPreview>

      <SectionHeading className="md:text-3xl mb-0">
        Deeper Into the Forest
      </SectionHeading>

      <ProjectDetail
        imgSrc="/image/semantic-search.png"
        width={600}
        multipleCol
        className="place-items-center mb-[10dvh]"
      >
        <ProjectHeading className="lg:text-start">
          RAG Semantic Searching
        </ProjectHeading>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
          - Create embeddings, indexing data and perform meaningful search to
          extract needed information.
        </ProjectText>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
          - Use LLMs to generate responses based on the retrieved data.
        </ProjectText>
        <span className="text-center">
          image source:{" "}
          <LinkPreview
            className="text-xl lg:text-2xl font-bold"
            url="https://github.com/neuml/txtai"
          >
            txtai
          </LinkPreview>
        </span>
      </ProjectDetail>

      <ProjectDetail
        imgSrc="/image/data-indexing.png"
        multipleCol
        width={600}
        className="place-items-center mb-[10dvh]"
      >
        <ProjectHeading className="lg:text-start">Data Indexing</ProjectHeading>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch] sm:mb-4">
          - Transforms text data into{" "}
          <strong>
            <u>vector embeddings</u>
          </strong>{" "}
          using transformer model.
        </ProjectText>
        <ProjectText className="text-center lg:text-start max-w-[70ch] lg:max-w-[50ch]">
          - Store vector embeddings in an efficient{" "}
          <strong>index structure</strong> (FAISS) for fast approximate nearest
          neighbour search.
        </ProjectText>
      </ProjectDetail>
    </ScrollableSection>
  );
};
