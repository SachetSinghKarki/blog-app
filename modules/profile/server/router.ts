import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { createProfileSchema } from "../schemas/create-profile";
import { TRPCError } from "@trpc/server";

export const profileRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createProfileSchema)
    .mutation(async ({ ctx, input }) => {
      // Prevent one user from creating multiple profiles

      const existingUserProfile = await ctx.prisma.profile.findUnique({
        where: {
          userId: ctx.session!.user.id,
        },
      });

      if (existingUserProfile) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You already have a profile.",
        });
      }

      const existingProfile = await ctx.prisma.profile.findUnique({
        where: {
          username: input.username,
        },
      });

      if (existingProfile) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already exists.",
        });
      }

      const profile = await ctx.prisma.profile.create({
        data: {
          userId: ctx.session!.user.id,
          username: input.username,
          bio: input.bio,
          website: input.website || null,
          location: input.location,
        },
      });
      return profile;
    }),
});
