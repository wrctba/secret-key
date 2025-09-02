"use client";
import React, { useRef, useState } from "react";

export interface UploadProp {
  onUploadSuccess?: () => void;
}
export default function Upload({ onUploadSuccess }: UploadProp) {
  const [markdownFile, setMarkdownFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [result, setResult] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const markdownInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const handleAddMarkdown = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setMarkdownFile(e.target.files[0] || null);
    if (markdownInputRef.current) {
      markdownInputRef.current.value = "";
    }
  };

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setImageFiles((prev) => [
      ...prev,
      ...newFiles.filter((file) => !prev.some((f) => f.name === file.name)),
    ]);
    if (imagesInputRef.current) {
      imagesInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!markdownFile || !key) return;
    const formData = new FormData();
    formData.append("key", key);
    formData.append("markdown", markdownFile);
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });
    const res = await fetch("/api/upload-markdown", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      setResult("Upload successful");
      onUploadSuccess?.();
    } else {
      setResult("Upload failed");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 p-4">
      <div className="p-2">
        <p>
          Submit a markdown file with optional images to create a new entry:
        </p>
      </div>

      <div className="p-2">
        <input
          id="key"
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="key or phrase"
          className="border rounded p-2 w-80"
        />
      </div>
      <div className="p-2">
        <input
          ref={markdownInputRef}
          id="file-markdown"
          style={{ display: "none" }}
          type="file"
          accept=".md"
          onChange={handleAddMarkdown}
          required
        />

        {!!markdownFile ? (
          <ul>
            <li className="p-2" key={markdownFile.name}>
              {markdownFile.name}
              <span
                className="p-2 m-1 cursor-pointer"
                onClick={() => setMarkdownFile(null)}
              >
                ❌
              </span>
            </li>
          </ul>
        ) : (
          <label
            htmlFor="file-markdown"
            className="border rounded p-2 w-80 text-center"
            style={{
              cursor: "pointer",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            Upload markdown file
          </label>
        )}
      </div>
      <div className="p-2">
        <input
          ref={imagesInputRef}
          id="file-images"
          style={{ display: "none" }}
          type="file"
          accept="image/png"
          multiple
          onChange={handleAddImages}
        />
        <label
          htmlFor="file-images"
          className="border rounded p-2 w-80 text-center"
          style={{
            cursor: "pointer",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "inline-block",
          }}
        >
          Upload image files
        </label>
        {imageFiles.length > 0 && (
          <ul>
            {imageFiles.map((file) => (
              <li className="p-2" key={file.name}>
                {file.name}
                <span
                  className="p-2 m-1 cursor-pointer"
                  onClick={() =>
                    setImageFiles(
                      imageFiles.filter((f) => f.name !== file.name)
                    )
                  }
                >
                  ❌
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        disabled={!key || !markdownFile}
        onClick={handleSubmit}
        className={`px-4 py-2 rounded mt-2 ${
          !key || !markdownFile
            ? "bg-gray-400 text-gray-700"
            : "bg-green-500 text-white cursor-pointer"
        }`}
        type="submit"
      >
        Send
      </button>
      {result && <p className="mt-2">{result}</p>}
    </main>
  );
}
