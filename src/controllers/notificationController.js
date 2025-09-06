import { createNotificationService, getNotificationsByUserService, markNotificationReadService, deleteNotificationService} from "../services/notificationService.js";

// Crear notificación
export const createNotification = async (req, res) => {
    try {
        const userId = req.user.id
        const { habitId, type, message, scheduledAt } = req.body;
        const notification = await createNotificationService({ userId, habitId, type, message, scheduledAt });
        res.status(201).json({ msg: "Notification created", notification });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Obtener notificaciones de un usuario
export const getNotifications = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const notifications = await getNotificationsByUserService({ id: userId });

        if (!notifications || notifications.length === 0) {
            return res.status(200).json({ msg: "No notifications found" }); 
        }

        res.status(200).json({ msg: "User notifications", notifications });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Marcar notificación como leída
export const markNotificationRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await markNotificationReadService(id);
        res.status(200).json({ msg: "Notification marked as read", notification });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Eliminar notificación
export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteNotificationService({ id });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
