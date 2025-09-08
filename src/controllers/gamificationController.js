import { getUserGamificationService, getAchievementsService, unlockAchievementService } from "../services/gamificationService.js";

// Ver estado de gamificación
export const getUserGamification = async (req, res) => {
    try {
        const { userId } = req.params;
        const gamification = await getUserGamificationService(userId);
        res.status(200).json(gamification);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Listar logros
export const getAchievements = async (req, res) => {
    try {
        const { userId } = req.params;
        const achievements = await getAchievementsService(userId);
        res.status(200).json({ achievements });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Desbloquear logro
export const unlockAchievement = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name } = req.body; // Nombre del logro
        const achievement = await unlockAchievementService(userId, name);
        res.status(201).json({ msg: "Achievement unlocked", achievement });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
