import prisma from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getHealth = asyncHandler(async (req, res) => {
  await prisma.$queryRaw`SELECT 1`;

  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});