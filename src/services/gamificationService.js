import { findGamificationByUserId } from "../repositories/gamificationRepository.js";
import Achievement from "../models/Achievement.js";

// Ver estado de gamificación
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

// Listar logros de un usuario
export const getAchievementsService = async (userId) => {
    const gamification = await findGamificationByUserId(userId);
    if(!gamification) throw new Error("Gamification not found");

    const achievements = await Achievement.findAll({ where: { gamificationId: gamification.id } });
    return achievements.map(a => ({ id: a.id, name: a.name, createdAt: a.createdAt }));
};

// Desbloquear nuevo logro
export const unlockAchievementService = async (userId, achievementName) => {
    const gamification = await findGamificationByUserId(userId);
    if(!gamification) throw new Error("Gamification not found");

    const existing = await Achievement.findOne({ where: { gamificationId: gamification.id, name: achievementName } });
    if(existing) throw new Error("Achievement already unlocked");

    const newAchievement = await Achievement.create({
        gamificationId: gamification.id,
        name: achievementName
    });

    return { id: newAchievement.id, name: newAchievement.name, createdAt: newAchievement.createdAt };
};
