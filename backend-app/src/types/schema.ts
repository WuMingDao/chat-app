import * as z from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1).max(30),
  password: z.string().min(6).max(30),
  profile: z.union([z.string().url(), z.literal("")]),
});

export type userType = z.infer<typeof userSchema>;
