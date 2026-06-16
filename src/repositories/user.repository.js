import prisma from "../lib/prisma.js";

export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = async (userData) => {
  return prisma.user.create({
    data: userData,
  });
};