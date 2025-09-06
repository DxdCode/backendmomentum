import { DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import User from './User.js';

const Habit = sequelize.define('Habit', {
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
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: { len: [2, 50] }
    },
    category: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: { len: [2, 30] }
    },
    frequency: {
        type: DataTypes.ENUM('diaria', 'semanal', 'mensual'),
        allowNull: false,
        defaultValue: "diaria"
    },
    priority: {
        type: DataTypes.ENUM('baja', 'media', 'alta'),
        allowNull: true
    },
    reminder: {
        type: DataTypes.TIME,
        allowNull: true
    }

}, {
    tableName: 'habits',
    timestamps: true
});

User.hasMany(Habit, { foreignKey: 'userId' });
Habit.belongsTo(User, { foreignKey: 'userId' });

export default Habit;