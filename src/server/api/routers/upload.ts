import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { put } from "@vercel/blob";
import Papa from "papaparse";
import { CareerEventType } from "@prisma/client";

// Define a type for the expected CSV row structure
interface CsvRow {
  type: string;
  title: string;
  organization: string;
  description?: string;
  startDate: string;
  endDate?: string;
  // Add other expected columns here if any
}

// Type guard to validate CSV row structure
const isCsvRow = (row: unknown): row is CsvRow => {
  return (
    typeof row === 'object' &&
    row !== null &&
    'type' in row &&
    'title' in row &&
    'organization' in row &&
    'startDate' in row &&
    typeof (row as Record<string, unknown>).type === 'string' &&
    typeof (row as Record<string, unknown>).title === 'string' &&
    typeof (row as Record<string, unknown>).organization === 'string' &&
    typeof (row as Record<string, unknown>).startDate === 'string'
  );
};

// Helper function to parse MM/YYYY to Date object
const parseDate = (dateString: string): Date | undefined => {
  if (!dateString) return undefined;
  const [month, year] = dateString.split("/");
  if (month && year) {
    return new Date(parseInt(year), parseInt(month) - 1, 1); // Month is 0-indexed
  }
  return undefined;
};

export const uploadRouter = createTRPCRouter({
  uploadFile: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileContent: z.string(), // Base64 encoded file content
        fileType: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { fileName, fileContent, fileType } = input;

      try {
        // Convert base64 to Buffer
        const buffer = Buffer.from(fileContent, "base64");

        // Upload to Vercel Blob
        const blob = await put(fileName, buffer, {
          access: "public",
          contentType: fileType,
          addRandomSuffix: true,
        });

        return { url: blob.url };
      } catch (error) {
        console.error("Error in uploadFile mutation:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to upload file. Please try again later.",
        });
      }
    }),

  processFile: protectedProcedure
    .input(z.object({ blobUrl: z.string().url() }))
    .mutation(async ({ ctx, input }) => {
      const { blobUrl } = input;

      // Fetch the file content from Vercel Blob
      const response = await fetch(blobUrl);
      const fileContent = await response.text();

      // Parse CSV content
      const parsedData = Papa.parse<Record<string, unknown>>(fileContent, {
        header: true,
        skipEmptyLines: true,
      });

      if (parsedData.errors.length > 0) {
        console.error("CSV Parsing Errors:", parsedData.errors);
        throw new Error("Failed to parse CSV file.");
      }

      let importedCount = 0;
      const validCareerEventTypes = Object.values(CareerEventType);

      for (const row of parsedData.data) {
        // Type guard to ensure row has required properties
        if (!isCsvRow(row)) {
          console.warn("Skipping invalid row:", row);
          continue;
        }

        const type = row.type;
        if (!type || !validCareerEventTypes.includes(type as CareerEventType)) {
          console.warn(`Skipping row due to invalid CareerEventType: ${type}`, row);
          continue; // Skip row if type is invalid
        }

        const startDate = parseDate(row.startDate);
        const endDate = parseDate(row.endDate ?? ""); // Use nullish coalescing

        // Validate required fields before creating the object
        if (!row.title || !row.organization || !row.description || !startDate) {
          console.warn("Skipping row due to missing required fields:", row);
          continue;
        }

        // Basic mapping and validation for CareerEvent schema
        const careerEventData = {
          type: type as CareerEventType,
          title: row.title,
          organization: row.organization,
          description: row.description,
          startDate: startDate,
          endDate: endDate ?? undefined,
          userId: ctx.session.user.id,
        };

        try {
          await ctx.db.careerEvent.create({ data: careerEventData });
          importedCount++;
        } catch (error) {
          console.error("Error creating career event from CSV row:", row, error);
          // Continue processing other rows even if one fails
        }
      }

      return { importedCount };
    }),
});

