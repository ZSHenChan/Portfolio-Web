import "server-only";
import { FinalResumeData } from "@/app/interfaces/Resume";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { KnowledgeItem } from "@/app/lib/chatbot/types";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getMasterResume(
  key: string = "master_data.json",
): Promise<FinalResumeData> {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  const response = await s3.send(command);

  const str = await response.Body?.transformToString();
  if (!str) throw new Error("Empty string fetched.");

  return JSON.parse(str) as FinalResumeData;
}

export const getKnowledgeData = async (
  key: string = "knowledge.json",
): Promise<KnowledgeItem> => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  const response = await s3.send(command);

  const str = await response.Body?.transformToString();
  if (!str) throw new Error("Fetched empty string");

  return JSON.parse(str) as KnowledgeItem;
};
