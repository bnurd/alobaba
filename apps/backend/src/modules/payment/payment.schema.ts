import { z } from "zod/v4";

export const getPaymentProductsSchema = z.object({
  code: z.string(),
});
