import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: { len: [2, 50] }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { len: [6, 100] }
    },
    avatar: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    history: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true,
        defaultValue: []
    }
}, {
    tableName: 'users',
    timestamps: true,
});

// Add action to history
User.prototype.addHistory = async function(action) {
    this.history = [...this.history, { date: new Date(), action }];
    await this.save();
};

// Hash password before save
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

// Validate password
User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Exclude password from JSON
User.prototype.toJSON = function() {
    const values = { ...this.get() };
    delete values.password;
    return values;
};

export default User;
