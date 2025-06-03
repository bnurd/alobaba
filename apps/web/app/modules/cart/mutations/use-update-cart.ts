import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useTRPC } from "~/shared/libs/trpc";

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation({
    ...trpc.cart.updateCart.mutationOptions(),
    onSuccess: (_, vars) => {
      void queryClient.invalidateQueries({
        queryKey: trpc.cart.getCart.queryKey(),
      });

      if (vars.type === "subtract") {
        toast.success("Product subtracted from cart");
        return;
      }
      toast.success("Product added to cart");
    },
    onError: error => {
      toast.error(error.message || "Something went wrong");
    },
  });
};
