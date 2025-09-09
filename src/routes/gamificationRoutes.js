import express from "express";
import { getUserGamification, getLeaderboard, updateGamification } from "../controllers/gamificationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/user", authMiddleware, getUserGamification);

router.get("/leaderboard",authMiddleware, getLeaderboard);

router.put("/gamification",authMiddleware, updateGamification);

export default router;
