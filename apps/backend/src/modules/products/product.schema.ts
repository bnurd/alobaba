import type { Prisma } from "@akptest/database";
import { z } from "zod/v4";

export const getAllProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.custom<Prisma.Decimal>(),
  imageUrl: z.string().nullable(),
  slug: z.string(),
  stockQuantity: z.number().nullable(),
  minumumOrderQuantity: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type GetAllProductSchema = z.infer<typeof getAllProductSchema>;
