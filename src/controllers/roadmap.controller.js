import { asyncHandler } from "../utils/asyncHandler.js";
import { createUserRoadmap, getUserRoadmaps, getUserRoadmapById, deleteUserRoadmap } from "../services/roadmap.services.js";

export const createRoadmap = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const roadmap = await createUserRoadmap({
    title,
    description,
    userId: req.user.userId,
  });

  res.status(201).json({
    success: true,
    data: roadmap,
  });
});

export const getRoadmaps = asyncHandler(async (req, res) => {
  const roadmaps = await getUserRoadmaps(req.user.userId);

  res.status(200).json({
    success: true,
    data: roadmaps,
  });
});
export const getRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await getUserRoadmapById(
    req.params.id,
    req.user.userId
  );

  res.status(200).json({
    success: true,
    data: roadmap,
  });
});
export const deleteRoadmap = asyncHandler(
  async (req, res) => {
    await deleteUserRoadmap(
      req.params.id,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Roadmap deleted",
    });
  }
);