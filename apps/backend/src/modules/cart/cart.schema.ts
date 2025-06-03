import { z } from "zod/v4";

export const updateCartSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  type: z.enum(["add", "subtract"]),
});
