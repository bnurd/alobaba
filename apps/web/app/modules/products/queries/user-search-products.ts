import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "~/shared/libs/trpc";

export const useSearchProducts = ({ name }: { name: string }) => {
  const trpc = useTRPC();
  return useQuery(trpc.products.search.queryOptions({ q: name }));
};
