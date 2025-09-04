import User from "../models/User.js";

// Buscar usuario por email
export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

// Crear nuevo usuario
export const createUser = async ({ name, email, password, avatar }) => {
  return await User.create({ name, email, password, avatar });
};

// Buscar usuario por ID
export const findUserById = async (id) => {
  return await User.findByPk(id, { attributes: ["id","name","email","avatar","history"] });
};
