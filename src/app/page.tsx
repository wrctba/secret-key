"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [key, setKey] = useState("");
  const [content, setContent] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [newContent, setNewContent] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/get-key?key=" + key);
    if (res.ok) {
      const data = await res.json();
      setContent(data.content);
      setNotFound(false);
    } else {
      setContent(null);
      setNotFound(true);
    }
  };

  const handleCreate = async () => {
    await fetch("/api/set-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, content: newContent }),
    });
    setContent(newContent);
    setNotFound(false);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 p-4">
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="insira uma palavra ou a frase secreta"
        className="border rounded p-2 w-80 text-center"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Enviar
      </button>

      {content && (
        <div className="border rounded p-4 w-96 bg-gray-50">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}

      {notFound && (
        <div className="w-96">
          <p className="text-red-500">Chave não existe.</p>
          <textarea
            placeholder="Escreva o conteúdo em Markdown..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="border rounded w-full p-2 mt-2 h-32"
          />
          <button
            onClick={handleCreate}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Criar chave
          </button>
        </div>
      )}
    </main>
  );
}
