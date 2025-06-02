import type { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = String(process.env.JWT_SECRET_KEY ?? "1099283");

export interface JwtPayload {
  sub: string;
  exp: number;
  iat: number;
  name: string;
  email: string;
}

export const createToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET_KEY, {
    algorithm: "HS256",
  } as SignOptions);
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
  } catch {
    return null;
  }
};
