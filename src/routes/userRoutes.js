import express from "express";
import { registerUser, loginUser, getProfile, logoutUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import passport from "passport";
import { generateToken } from "../utils/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getProfile);
router.post("/logout", authMiddleware, logoutUser);
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
