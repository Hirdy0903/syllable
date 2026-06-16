import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createRoadmap,
  getRoadmaps,
  getRoadmap,
  deleteRoadmap,
} from "../controllers/roadmap.controller.js";

const router = Router();

router.post("/", authenticate, createRoadmap);
router.get("/", authenticate, getRoadmaps);
router.get("/:id", authenticate, getRoadmap);
router.delete("/:id", authenticate, deleteRoadmap);
export default router;