import { NextResponse } from "next/server";
import { head } from "@vercel/blob";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (!key) return NextResponse.json({ error: "missing key" }, { status: 400 });

  const fileKey = key.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  try {
    const blob = await head(`${fileKey}/key.md`);

    if (!blob.url) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    const text = await (await fetch(blob.url)).text();

    return NextResponse.json({ content: text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}
