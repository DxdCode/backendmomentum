import Habit from "../models/Habit.js";
import { createProgress, deleteProgressId, findAllProgressById, findProgressByHabit, findProgressById, updateProgress } from "../repositories/progressRepository.js"


export const createProgressService = async ({ habitId, userId, date, status }) => {

    if(!date || !status){
        throw new Error("Required data is missing or empty");
    }

    const validStatus = ['no_iniciado', 'pendiente', 'en_progreso', 'con_dificultades', 'completado', 'omitido'];
    if (!validStatus.includes(status.toLowerCase())) {
        throw new Error('Status invalid');
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) ){
        throw new Error('Invalid date');
    }


    const habit = await Habit.findOne({ where: { id: habitId, userId } });
    if (!habit) {
        throw new Error('Habit not found or does not belong to the user');
    }
    const newProgress = await createProgress({ habitId, userId, date, status })
    return newProgress
}

export const getProgressbyUserService = async ( userId) => {
    const progressUser = await findAllProgressById(userId)
    if (!progressUser) throw new Error("Invalid User ID");
    return progressUser

}
export const getProgressbyHabitIdService = async ({ id }) => {
    const progressHabit = await findProgressByHabit(id)
    if (!progressHabit) throw new Error("Invalid Habit ID");
    return progressHabit
}

export const updateProgressbyIdService = async (idProgress, { status }) => {
    const progress = await findProgressById(idProgress)
    if (!progress) throw new Error("Invalid Progress ID or not Found");

    if (status) progress.status = status
    await updateProgress(progress)
    return progress

}
export const deleteProgressbyIdService = async (idProgress) => {
    const progressId = await findProgressById(idProgress)
    if (!progressId) throw new Error("Invalid Progress ID or not Found")
    await deleteProgressId(idProgress)
    return { msg: "Delete habit successfully" }
}



