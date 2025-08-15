import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  // Get current user profile with onboarding status
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        onboardingCompleted: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }),

  // Mark onboarding as completed
  completeOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
    const updatedUser = await ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: { onboardingCompleted: true },
      select: {
        id: true,
        onboardingCompleted: true,
      },
    });

    return updatedUser;
  }),

  // Check if user needs onboarding
  needsOnboarding: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        onboardingCompleted: true,
      },
    });

    return {
      needsOnboarding: !user?.onboardingCompleted,
    };
  }),
});
