import {Router} from "express";
import { createHabit, deleteHabit, getHabitId, getHabits, updateHabit } from "../controllers/habitController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = Router();

// Rutas de hábitos
router.post("/create", authMiddleware,createHabit);
router.get("/habit", authMiddleware, getHabits);
router.get("/habit/:id", authMiddleware, getHabitId);
router.put("/habit/:id", authMiddleware, updateHabit);
router.delete("/habit/:id", authMiddleware, deleteHabit);


export default router