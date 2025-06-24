import { PrismaClient } from "@prisma/client"
import { NODE_ENV, ACTIVE_DATABASE_URL } from "./environment.js"

export * from "@prisma/client"

const globalForPrisma = globalThis as { prisma?: PrismaClient }

// Use the active database URL (local or remote)
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: ACTIVE_DATABASE_URL,
      },
    },
  })

if (NODE_ENV !== "production") globalForPrisma.prisma = prisma
