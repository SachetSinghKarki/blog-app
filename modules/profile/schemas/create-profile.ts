import { z } from "zod";

export const createProfileSchema = z.object({
  username: z
    .string()
    .min(3, "Username must me at least 3 characters ")
    .max(30, "Username cannot exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers and underscores are allowed.",
    ),
  bio: z.string().max(160).optional(),
  website: z
    .string()
    .url("Please enter a valid URL.")
    .optional()
    .or(z.literal("")),

  location: z.string().max(100).optional(),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;
