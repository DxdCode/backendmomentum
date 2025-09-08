import { createProgressService, deleteProgressbyIdService, getLeaderboardService, getProgressbyHabitIdService, getProgressbyUserService, getUserGamificationService, updateProgressbyIdService } from "../services/progressService.js"

// Crear Progreso
export const createProgress = async (req, res) => {
    try {
        const { date, status } = req.body;
        const userId = req.user.id;
        const { habitId } = req.params;
        const progressCreate = await createProgressService({ habitId, userId, date, status });
        res.status(201).json({ msg: "Progress created", progress: progressCreate });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Obtener progreso de usuario
export const getProgressUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const progressUser = await getProgressbyUserService(userId);
        if(!progressUser || progressUser.length === 0){
            return res.status(200).json({ msg: "No progress found" });
        }
        res.status(200).json({ msg: "List of progress", progress: progressUser });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Obtener progreso por hábito
export const getProgressHabitId = async (req, res) => {
    try {
        const { habitId } = req.params;
        const progressHabit = await getProgressbyHabitIdService({ id: habitId });
        if(!progressHabit || progressHabit.length === 0){
            return res.status(200).json({ msg: "No progress found for this habit" });
        }
        res.status(200).json({ msg: "Habit progress history", progress: progressHabit });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Actualizar progreso
export const updateProgresStatus = async (req, res) => {
    try {
        const { idProgress } = req.params;
        const { status } = req.body;
        const progressUpdated = await updateProgressbyIdService(idProgress, { status });
        res.status(200).json({ msg: "Progress updated successfully", progress: progressUpdated });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Eliminar progreso
export const deleteProgressId = async (req, res) => {
    try {
        const { idProgress } = req.params;
        const result = await deleteProgressbyIdService(idProgress);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ msg: error.message });
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

// Obtener gamificación de usuario
export const getUserGamification = async (req, res) => {
    try {
        const userId = req.user.id;
        const gamification = await getUserGamificationService(userId);
        res.status(200).json(gamification);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};