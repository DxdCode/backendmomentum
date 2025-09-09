import { 
  getUserGamificationService, 
  getLeaderboardService, 
  updateGamificationPointsAndStreak 
} from "../services/gamificationService.js";

// Obtener gamificación de usuario
export const getUserGamification = async (req, res) => {
    try {
        const userId = req.user.id; 
        const gamification = await getUserGamificationService(userId);
        res.status(200).json(gamification);
    } catch (error) {
        res.status(400).json({ msg: error.message });
        console.log(error)
    }
};

// Obtener leaderboard
export const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await getLeaderboardService();
        res.status(200).json({ leaderboard });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Actualizar la gamificación del usuario 
export const updateGamification = async (req, res) => {
    try {
        const { pointsEarned } = req.body;
        const userId = req.user.id; 
        const gamification = await updateGamificationPointsAndStreak(userId, pointsEarned);

        res.status(200).json({ msg: "Gamification updated successfully", gamification });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};