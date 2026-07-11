import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f8f5] px-4 py-10 text-foreground sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(15,23,42,0.07)_0%,transparent_35%),linear-gradient(300deg,rgba(20,184,166,0.16)_0%,transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.38))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.11)_1px,transparent_0)] opacity-25 [background-size:24px_24px]" />
      <section className="relative w-full">{children}</section>
      <Toaster />
    </main>
  );
}
