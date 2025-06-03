import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "~/shared/libs/trpc";

export const useRegister = () => {
  const trpc = useTRPC();

  return useMutation(trpc.auth.register.mutationOptions());
};
