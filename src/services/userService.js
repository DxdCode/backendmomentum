import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";
import { findUserByEmail, createUser, findUserById } from "../repositories/userRepository.js";

// Registro
export const registerUserService = async ({ name, email, password, avatar }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("Email already registered");

  const hashed = await hashPassword(password);
  const newUser = await createUser({ name, email, password: hashed, avatar });
  const token = generateToken(newUser.id);

  return { user: newUser, token };
};

// Login
export const loginUserService = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user.id);
  return { user, token };
};

// Obtener perfil
export const getProfileService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw new Error("User not found");
  return user;
};
