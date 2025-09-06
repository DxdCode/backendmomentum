import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Habit from './Habit.js';
import User from './User.js';

const Progress = sequelize.define('Progress', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    habitId: {
        type: DataTypes.INTEGER,
        references: { model: Habit, key: 'id' },
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' },
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(
            'no_iniciado',
            'pendiente',
            'en_progreso',
            'con_dificultades',
            'completado',
            'omitido'
        ),
        allowNull: false,
        defaultValue: 'no_iniciado'
    }
}, {
    tableName: 'progress',
    timestamps: true,
});

// Relaciones
User.hasMany(Progress, { foreignKey: 'userId' });
Progress.belongsTo(User, { foreignKey: 'userId' });

Habit.hasMany(Progress, { foreignKey: 'habitId' });
Progress.belongsTo(Habit, { foreignKey: 'habitId' });

export default Progress;
