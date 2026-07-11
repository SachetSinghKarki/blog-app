"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { signInSchema, type SignInInput } from "../schemas/sign-in";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PasswordInput } from "./password-input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthDivider } from "./auth-divider";
import { SocialLogin } from "./social-login";

export function SignInForm() {
  const router = useRouter();
  const inputClassName =
    "h-11 rounded-lg border-slate-200 bg-white/90 px-4 shadow-sm shadow-slate-200/50 placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-200";

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInInput) {
    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            toast.success("Signed in successfully.");
            router.push("/");
          },

          onError: (ctx) => {
            if (ctx.error.status === 403) {
              toast.error("Please verify your email first.");

              router.push("/resend-verification");

              return;
            }

            // Hide all credential-specific errors
            toast.error("Invalid email or password.");
          },
        },
      );
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <Card className="mx-auto w-full max-w-110 rounded-lg border border-white/70 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl [--card-spacing:--spacing(7)]">
      <CardHeader className="gap-2 px-7 pt-7 text-center">
        <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-950/15">
          B
        </div>
        <CardTitle className="text-2xl font-semibold text-slate-950">
          Welcome back
        </CardTitle>

        <CardDescription className="text-balance text-slate-500">
          Sign in to continue to your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-7 pb-7">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel className="text-sm font-medium text-slate-700">
                    Email
                  </FieldLabel>

                  <Input
                    {...field}
                    className={inputClassName}
                    placeholder="johndoe@example.com"
                    type="email"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <div className="flex items-center justify-between">
                    <FieldLabel className="text-sm font-medium text-slate-700">
                      Password
                    </FieldLabel>

                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-slate-500 underline-offset-4 transition-colors hover:text-slate-950 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <PasswordInput
                    {...field}
                    className={inputClassName}
                    placeholder="********"
                    autoComplete="current-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-11 w-full rounded-lg bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 hover:bg-slate-800"
            >
              {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
            <AuthDivider />
            <SocialLogin />
            <CardFooter className="justify-center px-0 pb-0 pt-1">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-slate-950 underline-offset-4 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
