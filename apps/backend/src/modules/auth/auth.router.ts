import { TRPCError } from "@trpc/server";

import * as authSchema from "~/modules/auth/auth.schema";
import * as authService from "~/modules/auth/auth.service";
import { protectedProcedure, publicProcedure, router } from "~/trpc";

export const authRouter = router({
  login: publicProcedure.input(authSchema.loginSchema).mutation(({ input }) => {
    return authService.login(input.email, input.password, input.followUp);
  }),
  profile: protectedProcedure.query(({ ctx }) => {
    if (!ctx.user.sub) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
    }

    return authService.getProfile(ctx.user.sub);
  }),
});
