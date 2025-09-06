import { createProgressService, deleteProgressbyIdService, getProgressbyHabitIdService, getProgressbyUserService, updateProgressbyIdService } from "../services/progressService.js"

// Crear Progreso
export const createProgress = async (req, res) => {
    try {
        const { date, status } = req.body
        const userId = req.user.id
        const { habitId } = req.params;
        const progressCreate = await createProgressService({ habitId, userId, date, status })
        res.status(201).json({ msg: "Create Progress", progress: progressCreate })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const getProgressUserId = async (req, res) => {
    try {
        const userId = req.user.id
        const progressUser = await getProgressbyUserService(userId)

        if (progressUser.length === 0 || !progressUser) {
            res.status(200).json({ msg: "Not found Progress" })
        }
        res.status(200).json({ msg: "List of Progress", UserProgress: progressUser })
        res.status
    } catch (error) {
        res.status(400).json({ msg: error.message })
        console.log(error)

    }
}
export const getProgressHabitId = async (req, res) => {
    try {
        const { habitId } = req.params;
        const progressHabit = await getProgressbyHabitIdService({ id: habitId });

        if (!progressHabit || progressHabit.length === 0) {
            return res.status(200).json({ msg: "No progress found for this habit" });
        }

        res.status(200).json({ msg: "Habit Progress History", progress: progressHabit });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
export const updateProgresStatus = async (req, res) => {
    try {
        const { idProgress } = req.params
        const { status } = req.body
        const ProgressUpdate = await updateProgressbyIdService(idProgress, { status })
        res.status(200).json({ msg: "Progress update successfully", Progress: ProgressUpdate })

    } catch (error) {
        res.status(400).json({ msg: error.message })

    }
}

export const deleteProgressId = async (req, res) => {
    try {
        const { idProgress } = req.params;
        const deleteHabit = await deleteProgressbyIdService(idProgress);
        res.status(200).json(deleteHabit);
    } catch (error) {
        res.status(400).json({ msg: error.message })

    }
}

