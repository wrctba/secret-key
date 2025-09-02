"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [key, setKey] = useState("");
  const [content, setContent] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setContent(null);
    setNotFound(false);
    setLoading(true);
    const res = await fetch("/api/get-key?key=" + key);
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setContent(data.content);
      setNotFound(false);
    } else {
      setContent(null);
      setNotFound(true);
    }
  };


  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 p-4">
      <input
        disabled={loading}
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="insert a key or phrase"
        className="border rounded p-2 w-80 text-center"
      />
      <button
        disabled={loading}
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
      { loading && <p>Loading...</p> }

      {content && <ReactMarkdown>{content}</ReactMarkdown>}
      {notFound && <p>Not Found</p>}
      
    </main>
  );
}
