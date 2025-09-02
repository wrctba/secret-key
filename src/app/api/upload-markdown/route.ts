import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const key = formData.get("key");
  const markdownFile = formData.get("markdown");
  const images = formData.getAll("images");

  if (!key || typeof key !== "string") {
    return NextResponse.json({ message: "Key not provided." }, { status: 400 });
  }

  if (!markdownFile || typeof markdownFile === "string") {
    return NextResponse.json(
      { message: "Markdown file not provided." },
      { status: 400 }
    );
  }

  const fileKey = key.replace(/[^a-zA-Z0-9.\-_]/g, "_");

  const mdBuffer = Buffer.from(await markdownFile.arrayBuffer());
  const mdContent = mdBuffer.toString();

  const imageNamesInMd = Array.from(
    mdContent.matchAll(/!\[.*?\]\((.*?)\)/g),
    (m) => m[1]
  );

  const imagesToUpload = images.filter(
    (img) => typeof img !== "string" && imageNamesInMd.includes(img.name)
  );

  const imageMap: Record<string, string> = {};
  for (const img of imagesToUpload) {
    if (typeof img === "string") continue;
    const buffer = Buffer.from(await img.arrayBuffer());
    const fileName = img.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const blob = await put(`${fileKey}/images/${fileName}`, buffer, {
      access: "public",
    });
    imageMap[img.name] = blob.url;
  }

  const replaceMdContent = mdContent.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, name) =>
      imageMap[name] ? `![${alt}](${imageMap[name]})` : match
  );

  await put(`${fileKey}/key.md`, replaceMdContent, { access: "public" });

  return NextResponse.json({ ok: true });
}
