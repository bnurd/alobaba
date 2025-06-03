import * as authSchema from "~/modules/auth/auth.schema";
import * as authService from "~/modules/auth/auth.service";
import { protectedProcedure, publicProcedure, router } from "~/trpc";

export const authRouter = router({
  login: publicProcedure.input(authSchema.loginSchema).mutation(({ input }) => {
    return authService.login(input.email, input.password, input.followUp);
  }),
  register: publicProcedure.input(authSchema.registerSchema).mutation(({ input }) => {
    return authService.register(input);
  }),
  profile: protectedProcedure.query(({ ctx }) => {
    return authService.getProfile(ctx.user.sub);
  }),
});
