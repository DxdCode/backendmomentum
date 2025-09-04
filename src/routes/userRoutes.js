import express from "express";
import { registerUser, loginUser, getProfile, logoutUser, forgotPassword, resetPasswordController, updateProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import passport from "passport";
import { generateToken } from "../utils/auth.js";
import parser from "../middlewares/upload.js";

const router = express.Router();

// Rutas de autenticación
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPasswordController);


// Rutas de perfil del usuario
router.get("/profile", authMiddleware, getProfile);
router.put("/profile/update", authMiddleware, parser.single("avatar"), updateProfile);
// Rutas de Google
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.redirect(process.env.FRONTEND_URL);
  }
);


export default router;
