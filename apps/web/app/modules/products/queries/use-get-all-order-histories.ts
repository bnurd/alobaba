import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "~/shared/libs/trpc";

export const useGetAllOrderHistories = () => {
  const trpc = useTRPC();

  return useQuery(trpc.payment.getHistories.queryOptions());
};
