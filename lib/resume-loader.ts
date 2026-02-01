import "server-only";
import { FinalResumeData } from "@/app/interfaces/Resume";
import { KnowledgeItem } from "@/app/lib/chatbot/types";
import rawResumeData from "@/public/resume/master_data.json";
import knowledgeData from "@/public/knowledge.json";

export async function getMasterResume(): Promise<FinalResumeData> {
  const data = rawResumeData as unknown as FinalResumeData;

  if (!data.header || !data["Work Experiences & Internships"]) {
    throw new Error("Invalid Resume JSON structure");
  }

  return data;
}

export async function getKnowledgeData(): Promise<KnowledgeItem> {
  const data = knowledgeData as unknown as KnowledgeItem;

  return data;
}
