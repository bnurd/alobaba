import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "~/shared/libs/trpc";

export const useCreatePayment = () => {
  const trpc = useTRPC();
  return useMutation(trpc.payment.createPayment.mutationOptions());
};
