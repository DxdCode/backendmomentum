import { Router } from "express";
import { createNotification, getNotifications, markNotificationRead, deleteNotification } from "../controllers/notificationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create",authMiddleware, createNotification);

router.get("/user", authMiddleware,getNotifications);

router.patch("/:id/read", authMiddleware,markNotificationRead);

router.delete("/:id", authMiddleware,deleteNotification);

export default router;
