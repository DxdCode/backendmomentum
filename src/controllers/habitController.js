import { deleteHabitService, getHabitIdService, getHabitsService, registerHabitService, updateHabitService } from "../services/habitService.js"


// Crear hábito
export const createHabit = async (req, res) => {
    try {
        const { name, category, frequency, priority, reminder } = req.body
        const userId = req.user.id
        const habitcreate = await registerHabitService({ userId, name, category, frequency, priority, reminder })
        res.status(201).json({ msg: "Create habit", habit: habitcreate })
    } catch (error) {
        res.status(400).json({ msg: error.message })
        console.log(error)
    }
}

// Actualizar hábito
export const updateHabit = async (req, res) => {
    try {
        const { name, category, frequency, priority, reminder } = req.body
        const { id } = req.params;
        const habitUpdate = await updateHabitService(id, { name, category, frequency, priority, reminder })
        res.status(200).json({ msg: "Habit update successfully", habit: habitUpdate })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//Eliminar hábito
export const deleteHabit = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteHabit = await deleteHabitService(id);
        res.status(200).json(deleteHabit);
    } catch (error) {
        res.status(400).json({ msg: error.message })

    }

}

export const getHabits = async (req, res) => {
    try {
        const userId = req.user.id;
        const filters = req.query;
        const habits = await getHabitsService(userId, filters);
        if (!habits || habits.length === 0) {
            return res.status(200).json({ msg: "No results were found for your habit search."});
        }
        res.status(200).json({ msg: "List of habits", habits });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getHabitId = async (req, res) => {
    try {
        const { id } = req.params
        const habit = await getHabitIdService(id)
        res.status(200).json(habit)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}