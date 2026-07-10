import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EmailVerifiedPage() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="items-center text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500" />

        <CardTitle>Email Verified 🎉</CardTitle>

        <CardDescription>
          Your email has been successfully verified.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 text-center">
        <p className="text-sm text-muted-foreground">
          You can now sign in and start sharing your thoughts with the world.
        </p>

        <Button  className="w-full">
          <Link href="/sign-in">Continue to Sign In</Link>
        </Button>
      </CardContent>
    </Card>
  );
}