import { Op } from "sequelize";
import { createHabit, deleteHabit, findHabitById, findHabitsByUser, updateHabit } from "../repositories/habitRepository.js"
import { findUserById } from "../repositories/userRepository.js";

// Crear hábito
export const registerHabitService = async ({ userId, name, category, frequency, priority, reminder }) => {

    if (!name || !category || !frequency || !priority || !reminder) {
        throw new Error("Required data is missing or empty");
    }

    const validFrequencies = ['diaria', 'semanal', 'mensual'];

    const user = await findUserById(userId)
    if (!user) {
        throw new Error("Not found User ID");
    }
    if (!validFrequencies.includes(frequency.toLowerCase())) {
        throw new Error(`Frecuencia inválida. Los valores permitidos son: ${validFrequencies.join(', ')}`);
    }
    const newHabit = await createHabit({ userId, name, category, frequency, priority, reminder })
    return newHabit
}

// Obtener hábitos con filtros
export const getHabitsService = async (userId, filters = {}) => {
    const processedFilters = {};
    if (filters.name) {
        processedFilters.name = { [Op.iLike]: `%${filters.name}%` };
    }

    if (filters.category) {
        processedFilters.category = { [Op.iLike]: `%${filters.category}%` };
    }


    if (filters.priority) {
        processedFilters.priority = { [Op.iLike]: `%${filters.priority}%` };
    }

    if (filters.reminder) {
        processedFilters.reminder = { [Op.iLike]: `%${filters.reminder}%` };
    }
    const habits = await findHabitsByUser(userId, processedFilters);
    return habits
};

// Obtener un hábitos 
export const getHabitIdService = async (habitId) => {
    const habits = await findHabitById(habitId)
    if (!habits) throw new Error("Invalid ID habit");

    return habits
}

// Actualizar hábitos
export const updateHabitService = async (habitId, { name, category, frequency, priority, reminde }) => {
    const habit = await findHabitById(habitId)
    if (!habit) throw new Error("Invalid ID habit");

    if (name) habit.name = name
    if (category) habit.category = category
    if (frequency) habit.frequency = frequency
    if (priority) habit.priority = priority
    if (reminde) habit.reminde = reminde

    await updateHabit(habit)
    return habit

}


// Eliminar hábito

export const deleteHabitService = async (id) => {
    const habitId = await findHabitById(id)
    if (!habitId) throw new Error("Invalid ID habit")
    await deleteHabit(id)
    return { msg: "Delete habit successfully" }
}


// Crear un reto del hábito

export const createHabitChallengeService = async (habitId, challengeDays) => {
    const habit = await findHabitById(habitId);
    if (!habit) throw new Error("Hábito no encontrado");

    habit.challengeDays = challengeDays;
    habit.challengeStartDate = new Date();

    await updateHabit(habit);
    return habit;
};


// Obtener un reto del hábito
export const getHabitChallengeService = async (habitId) => {
    const habit = await findHabitById(habitId);
    if (!habit) throw new Error("Habit not found");
    return {
        challengeDays: habit.challengeDays,
        challengeStartDate: habit.challengeStartDate
    };
};