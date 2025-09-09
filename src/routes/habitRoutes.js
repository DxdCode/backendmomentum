import {Router} from "express";
import { createHabit, createHabitChallenge, deleteHabit, getHabitChallenge, getHabitId, getHabits, updateHabit } from "../controllers/habitController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = Router();

// Rutas de hábitos
router.post("/create", authMiddleware,createHabit);
router.get("/habit", authMiddleware, getHabits);
router.get("/habit/:id", authMiddleware, getHabitId);
router.put("/habit/:id", authMiddleware, updateHabit);
router.delete("/habit/:id", authMiddleware, deleteHabit);


router.post("/:habitId/challenge", authMiddleware, createHabitChallenge);
router.get("/:habitId/challenge", authMiddleware, getHabitChallenge);


export default router