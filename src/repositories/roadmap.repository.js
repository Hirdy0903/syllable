import prisma from "../lib/prisma.js";

export const createRoadmap = async (data) => {
  return prisma.roadmap.create({
    data,
  });
};