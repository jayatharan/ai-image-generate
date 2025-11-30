"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setImage(null);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setImage(data.image);

    setLoading(false);
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Image Generator</h1>

      <textarea
        className="w-full p-3 border rounded mb-4"
        rows={3}
        placeholder="Describe your image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generate}
        className="px-4 py-2 bg-black text-white rounded"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {image && (
        <div className="mt-6">
          <img src={image} alt="Generated" className="rounded shadow" />
        </div>
      )}
    </main>
  );
}
