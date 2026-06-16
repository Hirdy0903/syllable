import { createRoadmap } from "../repositories/roadmap.repository.js";

export const createUserRoadmap = async ({
  title,
  description,
  userId,
}) => {
  return createRoadmap({
    title,
    description,
    userId,
  });
};