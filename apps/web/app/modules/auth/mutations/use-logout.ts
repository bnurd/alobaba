import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { TOKEN_KEY } from "~/shared/config";
import { sleep } from "~/shared/utils/utils";

export const useLogout = () => {
  return useMutation({
    mutationFn: () => {
      Cookies.remove(TOKEN_KEY);
      return sleep(1000);
    },
    onSuccess: () => {
      window.location.href = "/";
    },
  });
};
