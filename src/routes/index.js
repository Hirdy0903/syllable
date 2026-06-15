import { Router } from "express";
import { getHealth } from "../controllers/health.controller.js";
import authRoutes from "./auth.routes.js";

const router = Router();
router.use("/auth", authRoutes);
router.get("/health", getHealth);

export default router;