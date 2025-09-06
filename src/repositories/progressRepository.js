import Progress from "../models/Progress.js"


// Crear nuevo progreso
export const createProgress = async ({habitId,userId,date,status}) =>{
    return await Progress.create({habitId,userId,date,status})
}

// Buscar nuevo progreso por id
export const findProgressById = async(id) =>{
    return await Progress.findByPk(id)
}

// Buscar todo los progresos por el usaruio
export const findAllProgressById = async(userId) =>{
    return await Progress.findAll({ where: { userId } });
}

// Buscar historial de progreso por hábito
export const findProgressByHabit = async(habitId) =>{
    return await Progress.findAll({ where: { habitId } });
}

// Eliminar progreso
export const deleteProgressId = async (id) => {
    return await Progress.destroy({ where: { id } });
}

// Actualizar progreso
export const updateProgress = async (progress) => {
    return await progress.save()
}