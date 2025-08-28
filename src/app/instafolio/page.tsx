"use client";
import React, { useState, useEffect } from "react";

// Replace 'any' with a specific type or 'unknown' and narrow it
type DataType = {
  // define your data structure here
};

export default function InstafolioPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<DataType | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/instafolio/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.text();
        setResult({ error });
      } else {
        const data: DataType = await res.json();
        setResult(data);
      }
    } catch (err) {
      setResult({ error: String(err) });
    }
    setUploading(false);
  };

  useEffect(() => {
    // Example async fetch with proper error handling
    const fetchData = async () => {
      try {
        const res = await fetch("/api/instafolio/data");
        if (!res.ok) throw new Error("Failed to fetch");
        const json: DataType = await res.json();
        setResult(json);
      } catch (error) {
        // handle error
      }
    };
    void fetchData(); // Mark as intentionally unawaited
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-4xl font-bold mb-4">Instafolio</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Upload a PDF, CSV, TXT, or DOC file to extract your portfolio data.
      </p>
      <input
        type="file"
        accept=".pdf,.csv,.txt,.doc,.docx"
        onChange={e => {
          handleFileChange(e);
          console.log("Selected file:", e.target.files && e.target.files[0]);
        }}
        className="mb-4"
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Upload & Extract"}
      </button>
      {result && (
        <div className="mt-8 w-full max-w-4xl">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-lg text-gray-800">Upload Result</span>
            <button
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(result, null, 2));
              }}
            >
              Copy
            </button>
          </div>
          <pre className="bg-gray-50 p-6 rounded text-gray-900 text-base overflow-x-auto min-h-[300px] max-h-[600px]">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}