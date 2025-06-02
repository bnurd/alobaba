import { z } from "zod/v4";

export const signInSchema = z.object({
  email: z.email({ message: "Email is invalid" }),
  password: z.string().min(1, { message: "Password is required" }),
});
