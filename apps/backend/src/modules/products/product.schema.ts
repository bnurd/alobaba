import { z } from "zod/v4";

export const searchSchema = z.object({
  q: z.string(),
});

export type Search = z.infer<typeof searchSchema>;

export const searchResultSchema = z.array(
  z.object({ id: z.string(), name: z.string(), imgaeUrl: z.string().nullable() })
);

export type SearchResult = z.infer<typeof searchResultSchema>;
