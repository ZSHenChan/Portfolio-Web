export interface Reply {
  message: string;
}

import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const query = body.query;
  const reply = { message: "Hello, " + query };
  return NextResponse.json(reply);
}
