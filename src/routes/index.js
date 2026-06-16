import { Router } from "express";
import { getHealth } from "../controllers/health.controller.js";
import authRoutes from "./auth.routes.js";
import roadmapRoutes from "./roadmap.routes.js";
import aiRoutes from "./ai.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.get("/health", getHealth);
router.use("/roadmaps", roadmapRoutes);
router.use("/ai", aiRoutes);

export default router;