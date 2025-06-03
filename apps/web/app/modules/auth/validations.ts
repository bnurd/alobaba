import { z } from "zod/v4";

export const signInSchema = z.object({
  email: z.email({ message: "Email is invalid" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const registerSchema = z.object({
  email: z.email({ message: "Email is invalid" }),
  password: z.string().min(1, { message: "Password is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().regex(/^08\d{8,11}$/, { message: "Nomor telepon Indonesia tidak valid" }),
});
