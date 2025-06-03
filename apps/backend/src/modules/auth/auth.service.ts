import { TRPCError } from "@trpc/server";

import type { RegisterSchema } from "~/modules/auth/auth.schema";
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

      if (url.get("action") === "add_cart") {
        // add to cart
        const productId = url.get("product_id");
        if (!productId) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Product id not found" });
        }
        const qty = url.get("qty") ?? 1;
        console.log(qty);
        await cartService.updateCart(user.id, productId, Number(qty), "add");
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

export const register = async (input: RegisterSchema) => {
  await authRepository.createUser(input);
  return true;
};
