import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { envServer } from "@/app/env/server";
import { Readable } from "stream";

// 1. Initialize S3 Client (outside handler to reuse connection)
const s3 = new S3Client({
  region: envServer.AWS_REGION,
  credentials: {
    accessKeyId: envServer.AWS_ACCESS_KEY_ID!,
    secretAccessKey: envServer.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Key is required" }, { status: 400 });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: envServer.AWS_BUCKET_NAME,
      Key: key,
    });

    const response = await s3.send(command);

    const stream = response.Body as Readable;

    return new NextResponse(Readable.toWeb(stream) as ReadableStream, {
      headers: {
        "Content-Type": response.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("S3 Error:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
