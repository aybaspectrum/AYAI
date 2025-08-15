import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { CareerEventType } from "@prisma/client";

export const careerEventRouter = createTRPCRouter({
  // Get all career events for the current user
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const careerEvents = await ctx.db.careerEvent.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { startDate: "desc" },
    });

    return careerEvents;
  }),

  // Create a new career event
  create: protectedProcedure
    .input(
      z.object({
        type: z.nativeEnum(CareerEventType),
        title: z.string().min(1, "Title is required"),
        organization: z.string().min(1, "Organization is required"),
        description: z.string().min(1, "Description is required"),
        startDate: z.date(),
        endDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Validate that end date is after start date if provided
      if (input.endDate && input.endDate < input.startDate) {
        throw new Error("End date must be after start date");
      }

      const careerEvent = await ctx.db.careerEvent.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });

      return careerEvent;
    }),

  // Get a specific career event by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const careerEvent = await ctx.db.careerEvent.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id, // Ensure user can only access their own events
        },
      });

      if (!careerEvent) {
        throw new Error("Career event not found");
      }

      return careerEvent;
    }),

  // Delete a career event
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // First check if the career event exists and belongs to the user
      const careerEvent = await ctx.db.careerEvent.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!careerEvent) {
        throw new Error("Career event not found or you don't have permission to delete it");
      }

      // Delete the career event
      await ctx.db.careerEvent.delete({
        where: { id: input.id },
      });

      return { success: true, deletedId: input.id };
    }),
});
