import { PrismaClient } from "../generated/prisma";

// setup prisma for turborepo: https://www.prisma.io/docs/guides/turborepo
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
