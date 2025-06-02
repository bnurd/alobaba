import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { TOKEN_KEY } from "~/shared/config";
import { useTRPC } from "~/shared/libs/trpc";
import { useAuth } from "~/shared/providers/auth-provider";

export const useLogout = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { setIsAuthenticated, setUser } = useAuth();

  return useMutation({
    mutationFn: async () => {
      return new Promise(resolve => {
        Cookies.remove(TOKEN_KEY);

        queryClient.setQueryData(trpc.auth.profile.queryKey(), () => {
          return null as never; // force to never
        });

        setIsAuthenticated(false);
        setUser(null);
        resolve(true);
      });
    },
  });
};
