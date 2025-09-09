import { findGamificationByUserId, createGamification, updateGamification, findAllGamifications } from "../repositories/gamificationRepository.js";
import LEVEL_THRESHOLDS from "./constants/levelThresholds.js";



export const getUserGamificationService = async (userId) => {
    const gamification = await findGamificationByUserId(userId);
    if (!gamification) throw new Error("Gamification not found");

    return {
        points: gamification.points,
        level: gamification.level,
        streak: gamification.streak,
        bestStreak: gamification.bestStreak
    };
};

// Obtener leaderboard
export const getLeaderboardService = async () => {
    const allGamifications = await findAllGamifications();
    return allGamifications
        .sort((a, b) => b.points - a.points)
        .map(u => ({
            userId: u.userId,
            points: u.points,
            level: u.level,
            streak: u.streak,
            bestStreak: u.bestStreak
        }));
};


// Actualizar la gamificación puntos, racha y nivel
export const updateGamificationPointsAndStreak = async (userId, pointsEarned, date) => {
    let gamification = await findGamificationByUserId(userId);

    if (!gamification) {
        gamification = await createGamification({ userId, points: 0, level: 1, streak: 0, bestStreak: 0 });
    }

    gamification.points += pointsEarned;
    const today = new Date().toISOString().split('T')[0];

    if (date === today && pointsEarned > 0) {
        gamification.streak += 1;
        if (gamification.streak > gamification.bestStreak) gamification.bestStreak = gamification.streak;
    } else if (date === today && pointsEarned === 0) {
        gamification.streak = 0;
    }

    let level = 1;
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
        if (gamification.points >= LEVEL_THRESHOLDS[i]) {
            if (i === LEVEL_THRESHOLDS.length - 1) {
                throw new Error("The last level");
            }
            level = i + 2;
        }
    }

    gamification.level = level;

    await updateGamification(gamification.id, {
        points: gamification.points,
        level: gamification.level,
        streak: gamification.streak,
        bestStreak: gamification.bestStreak
    });

    return gamification;
};