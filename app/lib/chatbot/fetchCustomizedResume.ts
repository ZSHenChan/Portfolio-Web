"use server";

import { gemini_client as ai } from "@/lib/gemini";
import { Type } from "@google/genai";
import { ResumeEntry, SkillsData } from "@/app/interfaces/Resume";
import { envClient } from "@/app/env/client";
import { getMasterResume } from "@/lib/resume-loader";

const ResumeEntrySchema = {
  type: Type.OBJECT,
  required: ["title", "role", "date", "bullets"],
  properties: {
    title: {
      type: Type.STRING,
      description: "Name of the company, organization, or project title.",
    },
    role: {
      type: Type.STRING,
      description: "Job title or role held. If none, use an empty string.",
    },
    date: {
      type: Type.STRING,
      description:
        "The duration of the experience (e.g., 'Jan 2025 - Present').",
    },
    bullets: {
      type: Type.ARRAY,
      description: "List of bullet points describing achievements.",
      items: {
        type: Type.STRING,
      },
    },
  },
};

interface CompleteTemplateStructure {
  summary: string;
  "Work Experiences & Internships": ResumeEntry[];
  "Personal Projects": ResumeEntry[];
  "Leadership Experiences": ResumeEntry[];
  skills: SkillsData;
}

export const fetchResumeData = async (job_description: string) => {
  const MASTER_RESUME_DATA = await getMasterResume();
  const response = await ai.models.generateContent({
    model: envClient.NEXT_PUBLIC_GEMINI_MODEL_RESUME,
    contents: `instruction: You are a resume expert. 
  Filter and format the user's master resume data into the requested structure specifically for the Job Description: "${job_description}".
  
  User Master Data:
  ${JSON.stringify(MASTER_RESUME_DATA)}`,

    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: [
          "summary",
          "Work Experiences & Internships",
          "Personal Projects",
          "Leadership Experiences",
        ],
        properties: {
          summary: {
            type: Type.STRING,
            description:
              "A professional summary tailored to the target job description.",
          },
          "Work Experiences & Internships": {
            type: Type.ARRAY,
            items: ResumeEntrySchema,
          },
          "Personal Projects": {
            type: Type.ARRAY,
            items: ResumeEntrySchema,
          },
          "Leadership Experiences": {
            type: Type.ARRAY,
            items: ResumeEntrySchema,
          },
          skills: {
            type: Type.OBJECT,
            description: "A categorized list of skills and interests.",
            required: ["Technical", "Soft Skills", "Interests"],
            properties: {
              "Technical": {
                type: Type.STRING,
                description:
                  "A comma-separated string of technical tools and languages (e.g., 'Python, React, AWS') that fits the job description.",
              },
              "Soft Skills": {
                type: Type.STRING,
                description:
                  "A comma-separated string of interpersonal skills that is required for the job description and common skills for the same sector job.",
              },
              "Interests": {
                type: Type.STRING,
                description:
                  "A comma-separated string of personal hobbies or interests.",
              },
            },
          },
        },
      },
    },
  });

  const jsonString = response.text;
  if (!jsonString) throw new Error("Failed to parse json string");
  const result = JSON.parse(jsonString) as CompleteTemplateStructure;

  const finalResumeData = {
    header: MASTER_RESUME_DATA.header,
    education: MASTER_RESUME_DATA.education,

    summary: result.summary,
    "Work Experiences & Internships": result["Work Experiences & Internships"],
    "Personal Projects": result["Personal Projects"],
    "Leadership Experiences": result["Leadership Experiences"],
    skills: result.skills,
  };

  return finalResumeData;
};
