import {Notification} from "../models/index.js";

// Crear notificación
export const createNotification = async (data) => {
    return await Notification.create(data);
}

// Listar notificaciones  de un usuario
export const findNotificationsByUser = async (userId) => {
    return await Notification.findAll({ where: { userId, isRead: false },order: [["createdAt", "DESC"]]});
}

// Buscar notificación por id
export const findNotificationById = async (id) => {
    return await Notification.findByPk(id);
}

// Marcar como leída
export const markNotificationAsRead = async (notification) => {
    notification.isRead = true;
    return await notification.save();
}

// Eliminar notificación
export const deleteNotification = async (id) => {
    return await Notification.destroy({ where: { id } });
}
