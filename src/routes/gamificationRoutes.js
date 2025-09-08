import express from "express";
import { getUserGamification, getAchievements, unlockAchievement } from "../controllers/gamificationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:userId", authMiddleware, getUserGamification);

router.get("/:userId/achievements", authMiddleware, getAchievements);

router.post("/:userId/achievements", authMiddleware, unlockAchievement);

export default router;
