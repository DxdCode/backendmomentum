import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import User from './User.js';

const Notification = sequelize.define('Notification', {
    userId: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' },
        allowNull: false
    },
    message: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    sentAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

// Mark as read
Notification.prototype.markAsRead = async function() {
    this.read = true;
    await this.save();
};

Notification.belongsTo(User, { foreignKey: 'userId' });

export default Notification;
