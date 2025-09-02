import { IncomingForm } from "formidable";
import type { Fields, Files, File as FormidableFile } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import type { Response as NodeFetchResponse } from "node-fetch";
import FormData from "form-data";

// Disable Next.js default body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
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
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  (async () => {
        if (err) {
          console.error("Formidable error:", err);
          res.status(500).json({ error: "File upload error", details: err });
          resolve();
          return;
        }
        const fileKeys = Object.keys(files);
        if (fileKeys.length === 0) {
          res.status(400).json({ error: "No file uploaded" });
          resolve();
          return;
        }
        const fileKey = fileKeys[0];
        if (!fileKey) {
          res.status(400).json({ error: "No file uploaded" });
          resolve();
          return;
        }
  const fileObj = files[fileKey] as FormidableFile | FormidableFile[] | undefined;
        let filePath: string | undefined;
        let fileName: string | undefined;
        if (Array.isArray(fileObj)) {
          const f = fileObj[0] as FormidableFile | undefined;
          filePath = f?.filepath;
          fileName = typeof f?.originalFilename === 'string' ? f.originalFilename : 'upload.pdf';
        } else if (fileObj && typeof fileObj === 'object') {
          const f = fileObj;
          filePath = f.filepath;
          fileName = f.originalFilename && typeof f.originalFilename === 'string' ? f.originalFilename : 'upload.pdf';
        }
        if (!filePath || !fileName) {
          res.status(400).json({ error: "No file uploaded" });
          resolve();
          return;
        }

        // Send file to Python extractor service
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath), fileName);
  let pyRes: NodeFetchResponse | null = null;
        try {
          pyRes = await fetch("http://localhost:8000/extract", {
            method: "POST",
            // node-fetch expects form-data, not browser BodyInit
            body: formData,
            headers: formData.getHeaders(),
          });
        } catch (err) {
          res.status(500).json({ error: "Could not connect to extractor service", details: (err as Error).message });
          resolve();
          return;
        }

  if (!pyRes?.ok) {
          const errText = pyRes ? await pyRes.text() : 'Unknown error';
          res.status(500).json({ error: "Python extractor error", details: errText });
          resolve();
          return;
        }
        // Type the extracted data as unknown, then cast to object for safety
        const extracted: unknown = await pyRes.json();
        res.status(200).json({ extracted });
        // Clean up uploaded file
        if (filePath && typeof filePath === 'string' && fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        resolve();
      })();
    });
  });
}
