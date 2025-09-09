// services/progressService.js
import { createProgress, deleteProgressId, findAllProgressById, findProgressByHabit, findProgressById, updateProgress } from "../repositories/progressRepository.js";
import { findHabitsByUser } from "../repositories/habitRepository.js";
import POINTS_BY_STATUS from "./constants/pointsByStatus.js";

// Crear progreso
export const createProgressService = async ({ habitId, userId, date, status }) => {

    if (!date || !status) {
        throw new Error("Required data is missing or empty");
    }

    const validStatus = ['no_iniciado', 'pendiente', 'en_progreso', 'con_dificultades', 'completado', 'omitido'];
    if (!validStatus.includes(status.toLowerCase())) {
        throw new Error('Invalid status');
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new Error('Invalid date format');
    }

    const habit = await findHabitsByUser(userId, { id: habitId });
    if (habit.length === 0)  throw new Error('Habit not found or does not belong to the user');

    const pointsEarned = POINTS_BY_STATUS[status.toLowerCase()] || 0;
    const progress = await createProgress({ habitId, userId, date, status, pointsEarned });
    
    progress.pointsEarned = pointsEarned;
    await updateProgress(progress);

    return progress;
};

// Obtener progreso de usuario
export const getProgressbyUserService = async (userId) => {
    const progressUser = await findAllProgressById(userId);
    if (!progressUser) throw new Error("Invalid User ID");
    return progressUser;
};

// Obtener progreso por hábito
export const getProgressbyHabitIdService = async ({ id }) => {
    const progressHabit = await findProgressByHabit(id);
    if (!progressHabit) throw new Error("Invalid Habit ID");
    return progressHabit;
};

// Actualizar progreso
export const updateProgressbyIdService = async (idProgress, { status }) => {
    const progress = await findProgressById(idProgress);
    if (!progress) throw new Error("Invalid Progress ID");

    if (status) progress.status = status;

    const points = POINTS_BY_STATUS[status.toLowerCase()] || 0;
    progress.pointsEarned = points;

    // Actualizamos el progreso
    await updateProgress(progress);

    return progress;
};

// Eliminar progreso
export const deleteProgressbyIdService = async (idProgress) => {
    const progressId = await findProgressById(idProgress);
    if (!progressId) throw new Error("Invalid Progress ID");

    await deleteProgressId(idProgress);

    return { msg: "Progress deleted successfully" };
};
