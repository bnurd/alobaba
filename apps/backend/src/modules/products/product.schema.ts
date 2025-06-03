import type { Decimal } from "@akptest/database/generated/prisma/runtime/library";
import { z } from "zod/v4";

export const searchSchema = z.object({
  q: z.string(),
});
export type Search = z.infer<typeof searchSchema>;

export const searchResultSchema = z.array(
  z.object({ id: z.string(), name: z.string(), imgaeUrl: z.string().nullable(), slug: z.string() })
);
export type SearchResult = z.infer<typeof searchResultSchema>;

export const getDetailSchema = z.object({
  slug: z.string(),
});
export type GetDetail = z.infer<typeof getDetailSchema>;

export const detailProductOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.custom<Decimal>(),
  imageUrl: z.string().nullable(),
  minumumOrderQuantity: z.number().nullable(),
  slug: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  stockQuantity: z.number().nullable(),
  ProductImages: z.array(
    z.object({
      id: z.string(),
      imageUrl: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      productId: z.string(),
    })
  ),
  ProductCategory: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      productId: z.string(),
    })
  ),
});
export type DetailProductOutput = z.infer<typeof detailProductOutputSchema>;
