export default (sequelize, DataTypes) => {
  const Habit = sequelize.define('Habit', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
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
    },
    challengeDays: {
      type: DataTypes.INTEGER, 
      allowNull: true
    },
    challengeStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'habits',
    timestamps: true
  });

  return Habit;
};
