import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export default async function OnboardingLayout({
  children,
}: OnboardingLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (profile) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}