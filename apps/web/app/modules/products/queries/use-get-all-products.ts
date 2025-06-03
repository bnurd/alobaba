import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "~/shared/libs/trpc";

export const useGetAllProducts = () => {
  const trpc = useTRPC();
  return useQuery(trpc.products.getAll.queryOptions());
};
