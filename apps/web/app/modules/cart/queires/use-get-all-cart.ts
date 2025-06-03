import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "~/shared/libs/trpc";
import { useAuth } from "~/shared/providers/auth-provider";

export const useGetAllCart = () => {
  const { isAuthenticated } = useAuth();
  const trpc = useTRPC();

  return useQuery({
    ...trpc.cart.getCart.queryOptions(),
    // cart only fetched when user is authenticated
    enabled: isAuthenticated,
  });
};
