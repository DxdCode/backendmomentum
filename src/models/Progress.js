import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
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
        type: DataTypes.DATE,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

Progress.belongsTo(Habit, { foreignKey: 'habitId' });
Progress.belongsTo(User, { foreignKey: 'userId' });

export default Progress;