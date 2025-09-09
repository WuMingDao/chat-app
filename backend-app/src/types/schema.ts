import * as z from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1).max(30),
  password: z.string().min(6).max(30),
  profile: z.union([z.string().url(), z.literal("")]),
});

export const messageSchema = z.object({
  content: z.string().min(1).max(500),
  image: z.union([z.string().url(), z.literal("")]),
  senderId: z.number(),
  receiverId: z.number(),
});

export type userType = z.infer<typeof userSchema>;
export type messageType = z.infer<typeof messageSchema>;
