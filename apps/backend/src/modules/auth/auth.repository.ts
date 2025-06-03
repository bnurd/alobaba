import { prisma } from "@akptest/database";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

import type { RegisterSchema } from "~/modules/auth/auth.schema";

export const checkUser = async (email: string, password: string) => {
  const query = await prisma.user.findFirst({
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
    },
    where: {
      email: email,
    },
  });

  if (!query) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid email or password" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, query.password);
  if (!isPasswordCorrect) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid email or password" });
  }

  return query;
};

export const getUserById = async (userId: string) => {
  const query = await prisma.user.findUnique({
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      address: true,
      storeName: true,
    },
    where: {
      id: userId,
    },
  });

  if (!query) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid userId" });
  }

  return query;
};

export const createUser = async (input: RegisterSchema) => {
  const isEmailExist = await prisma.user.findFirst({
    where: {
      email: input.email,
    },
  });

  if (isEmailExist) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Email already exist" });
  }

  const password = await bcrypt.hash(input.password, 10);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      password,
      name: input.name,
      phone: input.phone,
    },
  });

  return user;
};
