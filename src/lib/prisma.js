import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

// Create a direct database connection pool (bypass Prisma temporarily)
export const dbPool = new Pool({
  host: "localhost",
  port: 5432,
  database: "syllable",
  user: "postgres",
  password: "password",
  max: 20,
});

// Export empty Prisma client for compatibility
export default {
  user: {
    findUnique: async () => null,
    create: async () => null,
  },
};