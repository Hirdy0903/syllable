import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { generateRoadmapController } from "../controllers/ai.controller.js";
import { roadmapQueue } from "../queues/roadmap.queue.js";
const router = Router();

router.post(
  "/generate",
  authenticate,
  generateRoadmapController
);
router.post(
  "/test-queue",
  authenticate,
  async (req, res) => {
    console.log("QUEUE ROUTE HIT");
    const job = await roadmapQueue.add(
      "generate-roadmap",
      {
        goal: "Backend Engineer",
      }
    );

    res.json({
      success: true,
      jobId: job.id,
    });
  }
);

export default router;