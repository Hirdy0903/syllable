import { asyncHandler } from "../utils/asyncHandler.js";
import { generateRoadmap } from "../services/ai.services.js";
import { createRoadmap } from "../repositories/roadmap.repository.js";
import redisClient from "../lib/redis.js";

export const generateRoadmapController = asyncHandler(
  async (req, res) => {
    const { goal } = req.body;

    const cacheKey = `roadmap:${goal.toLowerCase()}`;

    const cachedRoadmap = await redisClient.get(cacheKey);

    if (cachedRoadmap) {
      const roadmapData = JSON.parse(cachedRoadmap);

      const savedRoadmap = await createRoadmap({
        title: roadmapData.title,
        description: roadmapData.description,
        content: roadmapData,
        userId: req.user.userId,
      });

      return res.status(201).json({
        success: true,
        source: "cache",
        data: savedRoadmap,
      });
    }

    const roadmap = await generateRoadmap(goal);

    const savedRoadmap = await createRoadmap({
      title: roadmap.title,
      description: roadmap.description,
      content: roadmap,
      userId: req.user.userId,
    });

    await redisClient.set(
      cacheKey,
      JSON.stringify(roadmap),
      {
        EX: 60 * 60 * 24, // 24 hours
      }
    );

    res.status(201).json({
      success: true,
      source: "gemini",
      data: savedRoadmap,
    });
  }
);