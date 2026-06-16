import { createRoadmap, getRoadmaps } from "../repositories/roadmap.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { getRoadmapById } from "../repositories/roadmap.repository.js";
import { deleteRoadmap } from "../repositories/roadmap.repository.js";
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

export const getUserRoadmaps = async (userId) => {
  return getRoadmaps(userId);
};
export const getUserRoadmapById = async (
  roadmapId,
  userId
) => {
  const roadmap = await getRoadmapById(roadmapId);

  if (!roadmap) {
    throw new ApiError(404, "Roadmap not found");
  }

  if (roadmap.userId !== userId) {
    throw new ApiError(403, "Access denied");
  }

  return roadmap;
};
export const deleteUserRoadmap = async (
  roadmapId,
  userId
) => {
  const roadmap = await getRoadmapById(roadmapId);

  if (!roadmap) {
    throw new ApiError(404, "Roadmap not found");
  }

  if (roadmap.userId !== userId) {
    throw new ApiError(403, "Access denied");
  }

  await deleteRoadmap(roadmapId);
};
