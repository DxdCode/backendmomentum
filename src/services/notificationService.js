import { createNotification, findNotificationsByUser, findNotificationById, markNotificationAsRead, deleteNotification } from "../repositories/notificationReposity.js";

export const createNotificationService = async ({ userId, habitId, type, message, scheduledAt }) => {

    if (!habitId || !type || !message || !scheduledAt) {
        throw new Error("Required data is missing or empty");
    }
    
    if (!["recordatorio", "logro"].includes(type)) {
        throw new Error("Invalid notification type");
    }
    return await createNotification({ userId, habitId, type, message, scheduledAt });
}

export const getNotificationsByUserService = async ({ id }) => {
    return await findNotificationsByUser(id);
}

export const markNotificationReadService = async (id) => {
    const notification = await findNotificationById(id);
    if (!notification) throw new Error("Notification not found");
    return await markNotificationAsRead(notification);
}

export const deleteNotificationService = async ({ id }) => {
    const notification = await findNotificationById(id);
    if (!notification) throw new Error("Notification not found");
    await deleteNotification(id);
    return { msg: "Notification deleted successfully" };
}
