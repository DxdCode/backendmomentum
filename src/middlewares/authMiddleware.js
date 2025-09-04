import { verifyToken } from "../utils/auth.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
