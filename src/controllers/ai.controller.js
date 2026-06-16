import { asyncHandler } from "../utils/asyncHandler.js";
import { generateRoadmap } from "../services/ai.services.js";
import { createRoadmap } from "../repositories/roadmap.repository.js";

export const generateRoadmapController = asyncHandler(
  async (req, res) => {
    const { goal } = req.body;

    const roadmap = await generateRoadmap(goal);

    console.log("ROADMAP KEYS:", Object.keys(roadmap));
    console.log("TITLE:", roadmap.title);

    const savedRoadmap = await createRoadmap({
      title: roadmap.title,
      description: roadmap.description,
      content: roadmap,
      userId: req.user.userId,
    });

    res.status(201).json({
      success: true,
      data: savedRoadmap,
    });
  }
);