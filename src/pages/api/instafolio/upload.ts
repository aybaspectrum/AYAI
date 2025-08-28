// @ts-ignore
const formidable = require("formidable");
import type { NextApiRequest, NextApiResponse } from "next";
import type { Fields, Files } from "formidable";
import fs from "fs";
import path from "path";

// Disable Next.js default body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  // Ensure uploads directory exists
  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB limit
  });

  form.parse(req, async (err: any, fields: Fields, files: Files) => {
    if (err) {
      console.error("Formidable error:", err); // <--- Add this line
      return res.status(500).json({ error: "File upload error", details: err });
    }

    // Here you can save file info to your DB if needed

    // For now, just return file info
    res.status(200).json({ fields, files });
  });
}