import { TRPCError } from "@trpc/server";

import * as authRepository from "~/modules/auth/auth.repository";
import * as cartService from "~/modules/cart/cart.service";
import { createToken } from "~/utils/jwt";

export const login = async (email: string, password: string, followUpAct: string | undefined) => {
  const user = await authRepository.checkUser(email, password);

  if (followUpAct) {
    // follow up action
    try {
      // follow up action is a base64 encoded string
      const act = Buffer.from(followUpAct, "base64").toString();
      const url = new URLSearchParams(act);
      console.log(url.get("action"));
      if (url.get("action") === "add_cart") {
        // add to cart
        const productId = url.get("product_id");
        if (!productId) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Product id not found" });
        }
        await cartService.updateCart(user.id, productId, 1, "add");
      }
    } catch (error) {
      console.log(error);
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid follow up action" });
    }
  }

  const tokenExpired = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
  const tokenIssued = Math.floor(Date.now() / 1000); // convert to seconds

  const token = createToken({
    sub: user.id,
    name: user.name ?? "",
    email: user.email,
    exp: tokenExpired,
    iat: tokenIssued,
  });

  return token;
};

export const getProfile = async (userId: string) => {
  return authRepository.getUserById(userId);
};
