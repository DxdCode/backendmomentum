import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
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
        type: DataTypes.ENUM('Daily', 'Weekly', 'Monthly'),
        allowNull: false
    },
    priority: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    reminder: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: { len: [2, 100] }
    }
}, {
    tableName: 'habits',
    timestamps: true
});

User.hasMany(Habit, { foreignKey: 'userId' });
Habit.belongsTo(User, { foreignKey: 'userId' });

export default Habit;