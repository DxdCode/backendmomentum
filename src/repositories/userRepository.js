import User from "../models/User.js";

// Crear nuevo usuario
export const createUser = async (data) => {
  return await User.create(data);
};

// Buscar usuario por email
export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

// Buscar usuario por ID
export const findUserById = async (id) => {
  return await User.findByPk(id, { attributes: ["id","name","email","avatar"] });
};

export const updateUser = async (user) =>{
  return await user.save()
}
