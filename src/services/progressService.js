import Habit from "../models/Habit.js";
import { createGamification, findAllGamifications, findGamificationByUserId, updateGamification } from "../repositories/gamificationRepository.js";
import { createProgress, deleteProgressId, findAllProgressById, findProgressByHabit, findProgressById, updateProgress } from "../repositories/progressRepository.js"


// Crear progreso y actualizar gamificación
export const createProgressService = async ({ habitId, userId, date, status }) => {
    if(!date || !status){
        throw new Error("Required data is missing or empty");
    }

    const validStatus = ['no_iniciado', 'pendiente', 'en_progreso', 'con_dificultades', 'completado', 'omitido'];
    if (!validStatus.includes(status.toLowerCase())) {
        throw new Error('Status invalid');
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)){
        throw new Error('Invalid date format');
    }

    const habit = await Habit.findOne({ where: { id: habitId, userId } });
    if (!habit) throw new Error('Habit not found or does not belong to the user');

    // Crear progreso
    const progress = await createProgress({ habitId, userId, date, status });

    // Actualizar gamificación
    let gamification = await findGamificationByUserId(userId);
    if(!gamification){
        gamification = await createGamification({ userId, points: 0, level: 1, streak: 0, bestStreak: 0 });
    }

    const points = statusPoints[status.toLowerCase()] || 0;
    gamification.points += points;

    // Actualizar racha
    const today = new Date().toISOString().split('T')[0];
    if(date === today && points > 0){
        gamification.streak += 1;
        if(gamification.streak > gamification.bestStreak) gamification.bestStreak = gamification.streak;
    } else if(date === today && points === 0){
        gamification.streak = 0;
    }

    await updateGamification(gamification.id, {
        points: gamification.points,
        streak: gamification.streak,
        bestStreak: gamification.bestStreak
    });

    progress.pointsEarned = points;
    await updateProgress(progress);

    return progress;
};

// Obtener progreso de usuario
export const getProgressbyUserService = async ( userId) => {
    const progressUser = await findAllProgressById(userId)
    if (!progressUser) throw new Error("Invalid User ID");
    return progressUser

}

// Obtener progreso por hábito
export const getProgressbyHabitIdService = async ({ id }) => {
    const progressHabit = await findProgressByHabit(id)
    if (!progressHabit) throw new Error("Invalid Habit ID");
    return progressHabit
}

// Actualizar progreso y gamificación
export const updateProgressbyIdService = async (idProgress, { status }) => {
    const progress = await findProgressById(idProgress);
    if (!progress) throw new Error("Invalid Progress ID or not Found");

    if(status) progress.status = status;

    await updateProgress(progress);

    // Actualizar puntos
    const points = statusPoints[status.toLowerCase()] || 0;
    const gamification = await findGamificationByUserId(progress.userId);
    if(gamification){
        gamification.points += points;
        await updateGamification(gamification.id, { points: gamification.points });
        progress.pointsEarned = points;
        await updateProgress(progress);
    }

    return progress;
};


// Eliminar progreso
export const deleteProgressbyIdService = async (idProgress) => {
    const progressId = await findProgressById(idProgress)
    if (!progressId) throw new Error("Invalid Progress ID or not Found")
    await deleteProgressId(idProgress)
    return { msg: "Delete habit successfully" }
}


// Obtener leaderboard
export const getLeaderboardService = async () => {
    const allGamifications = await findAllGamifications();
    return allGamifications
        .sort((a,b) => b.points - a.points)
        .map(u => ({
            userId: u.userId,
            points: u.points,
            level: u.level,
            streak: u.streak,
            bestStreak: u.bestStreak
        }));
};

// Obtener estado de gamificación de un usuario
export const getUserGamificationService = async (userId) => {
    const gamification = await findGamificationByUserId(userId);
    if(!gamification) throw new Error("Gamification not found");
    return {
        points: gamification.points,
        level: gamification.level,
        streak: gamification.streak,
        bestStreak: gamification.bestStreak
    };
};

