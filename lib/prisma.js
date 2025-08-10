import { PrismaClient } from "./generated/prisma";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// hot reloading created by nextjs creates new instance of

//new instance of prisma so that we can query our database
