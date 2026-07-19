"use client";

import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Globe, MapPin } from "lucide-react";

import {
  createProfileSchema,
  type CreateProfileInput,
} from "../schemas/create-profile";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

// trpc imports
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function OnboardingForm() {
  const inputClassName =
    "h-11 rounded-lg border-slate-200 bg-white/90 px-4 shadow-sm shadow-slate-200/50 placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-200";

  const form = useForm<CreateProfileInput>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      username: "",
      bio: "",
      website: "",
      location: "",
    },
  });

  const trpc = useTRPC();
  const router = useRouter();

  // creating the mutation
  const createProfile = useMutation(
    trpc.profile.create.mutationOptions({
      onSuccess: async () => {
        toast.success("Profile created successfully");
        router.push("/dashboard");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  async function onSubmit(data: CreateProfileInput) {
    // We'll create the profile
    createProfile.mutate(data);
  }

  return (
    <Card className="mx-auto w-full max-w-130 rounded-xl border border-white/70 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex h-18 w-38 items-center justify-center rounded-lg border border-white/80 bg-white px-4 shadow-lg shadow-slate-950/10">
          <Image
            src="/logo.png"
            alt="MindSpace"
            width={553}
            height={451}
            priority
            className="h-14 w-auto object-contain"
          />
        </div>

        <CardTitle className="text-3xl font-bold">
          Welcome to MindSpace 👋
        </CardTitle>

        <CardDescription className="text-base">
          Let&apos;s personalize your experience before you continue.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            {/* Username */}
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Username</FieldLabel>

                  <div className="relative">
                    <AtSign className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

                    <Input
                      {...field}
                      placeholder="sachetkarki"
                      className={`${inputClassName} pl-10`}
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Bio */}
            <Controller
              name="bio"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Bio</FieldLabel>

                  <Textarea
                    {...field}
                    placeholder="Tell everyone a little about yourself..."
                    className="min-h-28 resize-none rounded-lg"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Website */}
            <Controller
              name="website"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Website</FieldLabel>

                  <div className="relative">
                    <Globe className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

                    <Input
                      {...field}
                      placeholder="https://yourwebsite.com"
                      className={`${inputClassName} pl-10`}
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Location */}
            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Location</FieldLabel>

                  <div className="relative">
                    <MapPin className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

                    <Input
                      {...field}
                      placeholder="Pokhara, Nepal"
                      className={`${inputClassName} pl-10`}
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              disabled={createProfile.isPending}
              className="mt-2 h-11 w-full rounded-lg"
            >
              {createProfile.isPending ? "Creating Profile..." : "Continue"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
