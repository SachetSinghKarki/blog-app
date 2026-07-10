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

export function SignInForm() {
  const router = useRouter();
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
              toast.error("Please verify your email before signing in.");
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
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>

        <CardDescription>Sign in to continue to your account.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>

                  <Input
                    {...field}
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
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>

                  <PasswordInput
                    {...field}
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

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-primary hover:underline"
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
