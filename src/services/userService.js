import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";
import { findUserByEmail, createUser, findUserById, updateUser } from "../repositories/userRepository.js";
import { Op } from "sequelize";
import { sendResetPasswordEmail } from "../utils/email.js";
import User from "../models/User.js";


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

// Recuperar  contraseña
export const requestPasswordReset = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  // Generar token
  const token = `Momentum+${Math.floor(Math.random() * 1_000_000_000)}`;
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  user.resetPasswordToken = token;
  user.resetPasswordExpires = expires;
  await user.save();

  // Enviar email
  await sendResetPasswordEmail(user.email, token);
  return { message: "Email sent c" };
};

// Resetear contraseña
export const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { [Op.gt]: new Date() }
    }
  });

  if (!user) throw new Error("Invalid or expired token");

  user.password = await hashPassword(newPassword);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return { message: "Password updated successfully" };
};

// Obtener perfil
export const getProfileService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw new Error("User not found");
  return user;
};

export const updateProfileService = async (userId, { name, email, avatar }) => {
  const user = await findUserById(userId);  
  if (!user) throw new Error("Usuario no encontrado");

  if (email) {  
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.id !== userId) {
      throw new Error("Another user is already registered with that email");
    }
    user.email = email;
  }

  if (name) user.name = name; 
  if (avatar) user.avatar = avatar;  

  await updateUser(user);  
  return user;  
}