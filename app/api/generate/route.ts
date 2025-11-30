import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await client.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024",
  });

  const imageData = result.data?.[0]?.b64_json;

  if (!imageData) {
    return NextResponse.json(
      { error: "No image returned from OpenAI" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    image: `data:image/png;base64,${imageData}`,
  });
}
