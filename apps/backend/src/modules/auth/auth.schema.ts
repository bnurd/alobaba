import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
  followUp: z.string().optional(),
});

export const registerSchema = z.object({
  email: z.email(),
  password: z.string(),
  name: z.string(),
  phone: z.string().optional(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
