import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Habit from './Habit.js';

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' },
        allowNull: false
    },
    habitId: {
        type: DataTypes.INTEGER,
        references: { model: Habit, key: 'id' },
        allowNull: true 
    },
    type: {
        type: DataTypes.ENUM("recordatorio", "logro"),
        allowNull: false
    },
    message: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    scheduledAt: {
        type: DataTypes.DATE, 
        allowNull: true
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'notifications',
    timestamps: true
});

// Relaciones
User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

Habit.hasMany(Notification, { foreignKey: 'habitId' });
Notification.belongsTo(Habit, { foreignKey: 'habitId' });

export default Notification;
