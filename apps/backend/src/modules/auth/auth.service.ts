import * as authRepository from "~/modules/auth/auth.repository";
import { createToken } from "~/utils/jwt";

export const login = async (email: string, password: string) => {
  const user = await authRepository.checkUser(email, password);

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
