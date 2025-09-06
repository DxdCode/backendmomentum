import { Router } from "express";
import { createProgress, deleteProgressId, getProgressHabitId, getProgressUserId, updateProgresStatus } from "../controllers/progressContoller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/:habitId", authMiddleware,createProgress);

router.get("/user", authMiddleware,getProgressUserId);

router.get("/habit/:habitId",authMiddleware, getProgressHabitId);

router.patch("/:idProgress",authMiddleware, updateProgresStatus);

router.delete("/:idProgress",authMiddleware, deleteProgressId);

export default router;