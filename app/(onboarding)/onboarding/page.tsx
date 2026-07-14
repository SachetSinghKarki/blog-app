import { OnboardingForm } from "@/modules/profile/components/onboarding-form";

export default function OnboardingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100 p-6">
      <OnboardingForm />
    </main>
  );
}