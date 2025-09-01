import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  const { key, content } = await req.json();
  if (!key || !content)
    return NextResponse.json({ error: "missing params" }, { status: 400 });

  await put(`chaves/${key}.md`, content, { access: "public" });
  return NextResponse.json({ ok: true });
}
