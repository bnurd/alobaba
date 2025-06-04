import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "~/shared/libs/trpc";

export const useGetPaymentProducts = (code: string) => {
  const trpc = useTRPC();

  return useQuery(trpc.payment.getPaymentProducts.queryOptions({ code }));
};
