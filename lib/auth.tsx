import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import VerifyEmailTemplate from "@/emails/verify-email-template";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,

    sendVerificationEmail: async ({ user, url }) => {
      const verificationUrl = new URL(url);
      verificationUrl.searchParams.set(
        "callbackURL",
          `${process.env.BETTER_AUTH_URL}/email-verified`,
      );

      try {
         await resend.emails.send({
          from: "onboarding@resend.dev",
          to: user.email,
          subject: "Verify your email",
          react: (
            <VerifyEmailTemplate
              name={user.name}
              verificationUrl={verificationUrl.toString()}
            />
          ),
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
