import {Gamification} from "../models/index.js";

// Crear gamificación
export const createGamification = async (data) => {
    return await Gamification.create(data);
};

// Buscar gamificación por userId
export const findGamificationByUserId = async (userId) => {
    return await Gamification.findOne({ where: { userId },order: [["createdAt", "DESC"]] },);
};

// Actualizar gamificación por ID
export const updateGamification = async (id, data) => {
    return await Gamification.update(data, { where: { id } });
};

// Obtener todas las gamificaciones
export const findAllGamifications = async () => {
    return await Gamification.findAll();
};

// Eliminar gamificación por ID 
export const deleteGamification = async (id) => {
    return await Gamification.destroy({ where: { id } });
};
