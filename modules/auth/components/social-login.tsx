import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { FaGoogle, FaGithub } from "react-icons/fa";

export function SocialLogin() {
  async function signInWithGoogle() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  }

  async function signInWithGithub() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  }
  return (
    <div className="grid gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={signInWithGoogle}
        className="h-11 w-full rounded-lg border-slate-200 bg-white/80 text-slate-700 shadow-sm shadow-slate-200/50 hover:bg-slate-50 hover:text-slate-950"
      >
        <FaGoogle className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={signInWithGithub}
        className="h-11 w-full rounded-lg border-slate-200 bg-white/80 text-slate-700 shadow-sm shadow-slate-200/50 hover:bg-slate-50 hover:text-slate-950"
      >
        <FaGithub className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
    </div>
  );
}
