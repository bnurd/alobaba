import { z } from "zod/v4";

export const getPaymentProductsSchema = z.object({
  code: z.string(),
});

export const createPaymentSchema = z.object({
  code: z.string(),
  address: z.string(),
});
