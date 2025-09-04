import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import User from './User.js';

const Gamification = sequelize.define('Gamification', {
    userId: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' },
        allowNull: false
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { isInt: true, min: 0 }
    },
    badges: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
});

Gamification.belongsTo(User, { foreignKey: 'userId' });

export default Gamification;