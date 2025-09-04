import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Comparar password
export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Generar JWT
export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Verificar JWT
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
