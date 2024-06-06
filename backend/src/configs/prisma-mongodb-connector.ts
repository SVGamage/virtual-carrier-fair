import { PrismaClient } from "@prisma/client";

let db: PrismaClient;
export const createConnection = async () => {
  if (!db) {
    const url = process.env.MONGODB_URL;
    db = new PrismaClient({ datasources: { db: { url } } });
  }
  return db;
};

export const disconnect = async () => {
  db.$disconnect();
};
