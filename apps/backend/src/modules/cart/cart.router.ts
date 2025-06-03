import * as cartSchema from "~/modules/cart/cart.schema";
import * as cartService from "~/modules/cart/cart.service";
import { protectedProcedure, router } from "~/trpc";

export const cartRouter = router({
  getCart: protectedProcedure.query(({ ctx }) => cartService.getCart(ctx.user.sub)),
  updateCart: protectedProcedure
    .input(cartSchema.updateCartSchema)
    .mutation(({ input, ctx }) =>
      cartService.updateCart(ctx.user.sub, input.productId, input.quantity, input.type)
    ),
});
