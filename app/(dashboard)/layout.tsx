import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppNavbar } from "@/modules/dashboard/components/app-navbar";
import { AppSidebar } from "@/modules/dashboard/components/app-sidebar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check session
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

  if (!profile) {
    redirect("/onboarding");
  }
  return (
    <div className="flex h-screen">
      <AppSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AppNavbar />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
