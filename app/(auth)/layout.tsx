import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      {children}
      <Toaster/>
    </main>
  );
}
