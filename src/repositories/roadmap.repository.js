import prisma from "../lib/prisma.js";

export const createRoadmap = async (data) => {
  return prisma.roadmap.create({
    data,
  });
};

export const getRoadmaps = async (userId) => {
  return prisma.roadmap.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};
export const getRoadmapById = async (id) => {
  return prisma.roadmap.findUnique({
    where: {
      id,
    },
  });
};
export const deleteRoadmap = async (id) => {
  return prisma.roadmap.delete({
    where: {
      id,
    },
  });
};
