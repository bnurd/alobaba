import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "~/shared/libs/trpc";

export const useGetDetailProduct = (slug: string) => {
  const trpc = useTRPC();

  return useQuery({
    ...trpc.products.getDetail.queryOptions({ slug }),
    enabled: !!slug,
  });
};
