import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function createTRPCContext() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  return {
    prisma,
    session
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
