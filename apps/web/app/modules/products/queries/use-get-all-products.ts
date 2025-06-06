import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "~/shared/libs/trpc";

export const useGetAllProducts = (params: { minPrice?: number; maxPrice?: number }) => {
  const trpc = useTRPC();
  return useQuery(
    trpc.products.getAll.queryOptions({ maxPrice: params.maxPrice, minPrice: params.minPrice })
  );
};
