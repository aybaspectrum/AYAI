import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { put } from "@vercel/blob";

export const uploadRouter = createTRPCRouter({
  uploadFile: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileContent: z.string(), // Base64 encoded file content
        fileType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { fileName, fileContent, fileType } = input;

      // Convert base64 to Buffer
      const buffer = Buffer.from(fileContent, "base64");

      // Upload to Vercel Blob
      const blob = await put(fileName, buffer, {
        access: "public",
        contentType: fileType,
      });

      return { url: blob.url };
    }),
});
