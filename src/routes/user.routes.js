import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/profile", protect, UserController.getProfile);
router.put("/profile", protect, UserController.updateProfile);

export default router;
