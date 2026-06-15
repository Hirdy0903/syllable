import { dbPool } from "../lib/prisma.js";

export const findUserByEmail = async (email) => {
  const query = 'SELECT id, email, password, "createdAt", "updatedAt" FROM "User" WHERE email = $1';
  const result = await dbPool.query(query, [email]);
  return result.rows[0] || null;
};

export const createUser = async (userData) => {
  const query = `
    INSERT INTO "User" (id, email, password, "createdAt", "updatedAt") 
    VALUES (gen_random_uuid(), $1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING id, email, password, "createdAt", "updatedAt"
  `;
  const result = await dbPool.query(query, [userData.email, userData.password]);
  return result.rows[0];
};