import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = Router();

// Registrar usuario
router.post("/register", (req, res) => UserController.register(req, res));

// Login usuario
router.post("/login", (req, res) => UserController.login(req, res));


export default router;
