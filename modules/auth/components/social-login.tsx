import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { FaGoogle, FaGithub } from "react-icons/fa";

export function SocialLogin() {
  async function signInWithGoogle() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }

  async function signInWithGithub() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  }
  return (
    <div className="grid gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={signInWithGoogle}
        className="w-full"
      >
        <FaGoogle className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={signInWithGithub}
        className="w-full"
      >
        <FaGithub className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
    </div>
  );
}
