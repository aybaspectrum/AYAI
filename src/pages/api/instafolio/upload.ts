import formidable, { Fields, Files, IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// Disable Next.js default body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  // Ensure uploads directory exists
  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB limit
  });

  await new Promise<void>((resolve) => {
    form.parse(req, (err: Error | null, fields: Fields, files: Files) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error("Formidable error:", err);
        res.status(500).json({ error: "File upload error", details: err });
        resolve();
        return;
      }

      // Here you can save file info to your DB if needed

      // For now, just return file info
      res.status(200).json({ fields, files });
      resolve();
    });
  });
}