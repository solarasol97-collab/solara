import { PrismaClient } from "../src/generated/prisma";

function getDatabaseUrl() {
  return (
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL ||
    process.env.STORAGE_URL ||
    process.env.POSTGRES_URL
  );
}

function createPrismaClient() {
  const url = getDatabaseUrl();

  if (!url) {
    throw new Error(
      "Database URL is not configured. Connect Neon in Vercel Storage (POSTGRES_PRISMA_URL)."
    );
  }

  return new PrismaClient({
    datasources: {
      db: { url },
    },
  });
}

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = createPrismaClient();
  }
  prisma = global.prisma;
}

export { prisma };
