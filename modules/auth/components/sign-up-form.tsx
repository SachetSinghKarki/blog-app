"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { signUpSchema, type SignUpInput } from "../schemas/sign-up";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthDivider } from "./auth-divider";
import { SocialLogin } from "./social-login";

export function SignUpForm() {
  const router = useRouter();
  const inputClassName =
    "h-11 rounded-lg border-slate-200 bg-white/90 px-4 shadow-sm shadow-slate-200/50 placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-200";

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpInput) {
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created successfully");
    router.push("/verify-email");
  }

  return (
    <Card className="mx-auto w-full max-w-110 rounded-lg border border-white/70 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl [--card-spacing:--spacing(7)]">
      <CardHeader className="gap-2 px-7 pt-7 text-center">
        <div className="mx-auto mb-3 flex h-18 w-38 items-center justify-center rounded-lg border border-white/80 bg-white/90 px-4 shadow-lg shadow-slate-950/10 ring-1 ring-slate-950/5">
          <Image
            src="/logo.png"
            alt="Mindspace"
            width={553}
            height={451}
            priority
            className="h-14 w-auto object-contain"
          />
        </div>
        <CardTitle className="text-2xl font-semibold text-slate-950">
          Create your account
        </CardTitle>

        <CardDescription className="text-balance text-slate-500">
          Enter your information to create an account.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-7 pb-7">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel className="text-sm font-medium text-slate-700">
                    Name
                  </FieldLabel>

                  <Input
                    {...field}
                    className={inputClassName}
                    placeholder="John Doe"
                    autoComplete="name"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
                  <FieldLabel className="text-sm font-medium text-slate-700">
                    Password
                  </FieldLabel>

                  <PasswordInput
                    {...field}
                    className={inputClassName}
                    placeholder="********"
                    autoComplete="new-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel className="text-sm font-medium text-slate-700">
                    Confirm Password
                  </FieldLabel>

                  <PasswordInput
                    {...field}
                    className={inputClassName}
                    placeholder="********"
                    autoComplete="new-password"
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
              {form.formState.isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </Button>
            <AuthDivider />
            <SocialLogin />
            <CardFooter className="justify-center px-0 pb-0 pt-1">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-slate-950 underline-offset-4 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
