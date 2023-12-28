import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient | null;
}

const prisma = globalThis.prismaClient || new PrismaClient();

if (process.env.NODE_ENV === "production") globalThis.prismaClient = prisma;

export default prisma;
