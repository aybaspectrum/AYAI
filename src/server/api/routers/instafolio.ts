import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const instafolioRouter = createTRPCRouter({
  // Create new test data
  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      fullName: z.string(),
      tagline: z.string(),
      heroSubtitle: z.string(),
      aboutMe: z.string(),
      email: z.string(),
      linkedin: z.string(),
      phone: z.string().optional(),
      calendly: z.string().optional(),
      section2Label: z.string(),
      section2Vars: z.array(z.string()),
      section2Vals: z.array(z.number()),
      footerTagline: z.string(),
      socialLinks: z.array(z.string()),
      educations: z.array(z.object({
        year: z.string(),
        degree: z.string(),
        institution: z.string(),
        location: z.string(),
        skills: z.array(z.string()),
      })),
      projects: z.array(z.object({
        year: z.string(),
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
      })),
      experiences: z.array(z.object({
        dateRange: z.string(),
        title: z.string(),
        company: z.string(),
        achievements: z.array(z.string()),
      })),
      skills: z.array(z.object({
        number: z.string(),
        title: z.string(),
        description: z.string(),
      })),
    }))
    .mutation(async ({ ctx, input }) => {
  return db.instaFolioTestData.create({
        data: {
          userId: ctx.session.user.id,
          ...input,
          educations: {
            create: input.educations,
          },
          projects: {
            create: input.projects,
          },
          experiences: {
            create: input.experiences,
          },
          skills: {
            create: input.skills,
          },
        },
      });
    }),

  // List all test data for the user
  list: protectedProcedure.query(async ({ ctx }) => {
  return db.instaFolioTestData.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        educations: true,
        projects: true,
        experiences: true,
        skills: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Get a single test data set by ID
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
  return db.instaFolioTestData.findUnique({
        where: { id: input.id, userId: ctx.session.user.id },
        include: {
          educations: true,
          projects: true,
          experiences: true,
          skills: true,
        },
      });
    }),

  // Delete a test data set
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
  return db.instaFolioTestData.delete({
        where: { id: input.id, userId: ctx.session.user.id },
      });
    }),
});
