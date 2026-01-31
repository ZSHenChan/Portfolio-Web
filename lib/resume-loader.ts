import "server-only";
import path from "path";
import { promises as fs } from "fs";
import { FinalResumeData } from "@/app/interfaces/Resume";
import { MASTER_RESUME_FILEPATH } from "@/app/lib/chatbot/config";

export async function getMasterResume(): Promise<FinalResumeData> {
  const jsonDirectory = path.join(process.cwd(), "public");
  const filePath = path.join(jsonDirectory, MASTER_RESUME_FILEPATH);

  const fileContents = await fs.readFile(filePath, "utf8");

  const data = JSON.parse(fileContents) as FinalResumeData;

  if (!data.header || !data["Work Experiences & Internships"]) {
    throw new Error("Invalid Resume JSON structure");
  }

  return data;
}
