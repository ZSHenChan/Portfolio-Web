import "server-only";
import { FinalResumeData } from "@/app/interfaces/Resume";
import rawResumeData from "@/public/resume/master_data.json";

export async function getMasterResume(): Promise<FinalResumeData> {
  const data = rawResumeData as unknown as FinalResumeData;

  if (!data.header || !data["Work Experiences & Internships"]) {
    throw new Error("Invalid Resume JSON structure");
  }

  return data;
}
