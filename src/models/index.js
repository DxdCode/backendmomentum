import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

// Importar definición de modelos
import defineUser from './User.js';
import defineHabit from './Habit.js';
import defineNotification from './Notification.js';
import defineProgress from './Progress.js';
import defineGamification from './Gamification.js';
import defineAchievement from './Achievement.js';

// Inicializar modelos
const User = defineUser(sequelize, DataTypes);
const Habit = defineHabit(sequelize, DataTypes);
const Notification = defineNotification(sequelize, DataTypes);
const Progress = defineProgress(sequelize, DataTypes);
const Gamification = defineGamification(sequelize, DataTypes);
const Achievement = defineAchievement(sequelize, DataTypes);

// Definir asociaciones

// User relaciones
User.hasOne(Gamification, { foreignKey: 'userId' });
Gamification.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Habit, { foreignKey: 'userId' });
Habit.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Progress, { foreignKey: 'userId' });
Progress.belongsTo(User, { foreignKey: 'userId' });

// Habit relaciones
Habit.hasMany(Notification, { foreignKey: 'habitId' });
Notification.belongsTo(Habit, { foreignKey: 'habitId' });

Habit.hasMany(Progress, { foreignKey: 'habitId' });
Progress.belongsTo(Habit, { foreignKey: 'habitId' });

// Gamification y Achievement
Gamification.hasMany(Achievement, { foreignKey: 'gamificationId' });
Achievement.belongsTo(Gamification, { foreignKey: 'gamificationId' });

// Exportar modelos y sequelize
export {
  sequelize,
  User,
  Habit,
  Notification,
  Progress,
  Gamification,
  Achievement
};
