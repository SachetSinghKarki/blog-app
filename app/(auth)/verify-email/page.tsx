import { Mail } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerifyEmailPage() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="items-center text-center">
        <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <Mail className="text-primary h-8 w-8" />
        </div>

        <CardTitle>Check your email</CardTitle>

        <CardDescription>
          We&apos;ve sent you a verification link.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 text-center">
        <p className="text-muted-foreground text-sm">
          Click the verification link in your inbox to activate your account.
        </p>

        <p className="text-muted-foreground text-sm">
          If you don&apos;t see the email, check your spam or junk folder.
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full" variant="outline">
          <Link href="/resend-verification">Resend Verification Email</Link>
        </Button>

        <Button variant="link">
          <Link href="/sign-in">Back to Sign In</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
