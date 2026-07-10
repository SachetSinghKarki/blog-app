import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";


import VerifyEmailTemplate from "@/emails/verify-email-template";
import ResetPasswordTemplate from "@/emails/reset-password-template";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

  // reset password email if user forgets the password and request it for resetting the password 
   sendResetPassword:async ({user, url}) => {
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Reset your password",
        react: (
          <ResetPasswordTemplate
            name={user.name}
            resetUrl={url}
          />
        )
      })
    } catch (error) {
      console.error(error)
    }
   }
   
  },

  // For verifying the email in sign up
  emailVerification: {
    sendOnSignUp: true,

    sendVerificationEmail: async ({ user, url }) => {
      const verificationUrl = new URL(url);
      verificationUrl.searchParams.set(
        "callbackURL",
          `${process.env.BETTER_AUTH_URL}/email-verified`,
      );

      try {
        const result = await resend.emails.send({
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
          console.log(result); 

      } catch (error) {
        console.error(error);
      }
    },
  },


// for social logins like google and github
  socialProviders:{
    google:{
      clientId:process.env.GOOGLE_CLIENT_ID!,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET!
    },
    github:{
      clientId:process.env.GITHUB_CLIENT_ID!,
      clientSecret:process.env.GITHUB_CLIENT_SECRET!
    }
  }

  
});
