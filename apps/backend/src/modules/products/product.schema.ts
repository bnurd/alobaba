import { z } from "zod/v4";

export const getAllProductsSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export type GetAllProductsSchema = z.infer<typeof getAllProductsSchema>;
