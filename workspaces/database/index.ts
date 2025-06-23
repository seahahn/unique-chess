import { PrismaClient } from "@prisma/client"
import { NODE_ENV } from "./environment"

export * from "@prisma/client"

const globalForPrisma = globalThis as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (NODE_ENV !== "production") globalForPrisma.prisma = prisma
