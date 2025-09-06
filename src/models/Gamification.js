import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Gamification = sequelize.define('Gamification', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' },
        allowNull: false,
        unique: true 
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    streak: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    bestStreak: {
        type: DataTypes.INTEGER, 
        defaultValue: 0
    },
    achievements: {
        type: DataTypes.JSON,
        defaultValue: []
    }
}, {
    tableName: 'gamifications',
    timestamps: true
});

User.hasOne(Gamification, { foreignKey: 'userId' });
Gamification.belongsTo(User, { foreignKey: 'userId' });

export default Gamification;
