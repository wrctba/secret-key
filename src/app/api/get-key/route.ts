import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (!key) return NextResponse.json({ error: "missing key" }, { status: 400 });

  try {
    // Lista blobs com prefixo da pasta "chaves/"
    const { blobs } = await list({ prefix: `chaves/${key}.md` });

    if (blobs.length === 0) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    // Pega o primeiro blob encontrado
    const blob = blobs[0];
    const text = await (await fetch(blob.url)).text();

    return NextResponse.json({ content: text });
  } catch (err) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}
