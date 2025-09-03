import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/profile", protect, (req, res) => UserController.getProfile(req, res));
router.put("/profile", protect, (req, res) => UserController.updateProfile(req, res));

export default router;
