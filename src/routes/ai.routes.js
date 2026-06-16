import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { generateRoadmapController } from "../controllers/ai.controller.js";

const router = Router();

router.post(
  "/generate",
  authenticate,
  generateRoadmapController
);

export default router;