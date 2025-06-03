import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

import { TOKEN_KEY } from "~/shared/config";
import { useTRPC } from "~/shared/libs/trpc";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return useMutation({
    ...trpc.auth.login.mutationOptions(),
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: (data: string) => {
      Cookies.set(TOKEN_KEY, data);

      // invalidate profile query
      toast.success("Login Successful. You will be redirected...", {
        duration: 1000,
      });

      void queryClient.invalidateQueries({
        queryKey: trpc.auth.profile.queryKey(),
      });

      const returnTo = searchParams.get("return") ?? "/";
      void navigate(returnTo, { replace: true });
    },
  });
};
