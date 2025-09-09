import {Habit} from "../models/index.js";

// Crear nuevo hábito
export const createHabit = async (data) => {
    return await Habit.create(data)
}

// Buscar hábito por id
export const findHabitById = async (id) => {
    return await Habit.findByPk(id);
}


// Buscar hábito por una opción
export const findHabitsByUser = async (userId, filters = {}) => {
  return await Habit.findAll({
    where: { userId, ...filters },order: [["createdAt", "DESC"]]
  });
};

// Eliminar hábito 
export const deleteHabit = async (id) => {
    return await Habit.destroy({ where: { id } });
}

// Actualizar hábito 
export const updateHabit = async (habit) => {
    return await habit.save()
}