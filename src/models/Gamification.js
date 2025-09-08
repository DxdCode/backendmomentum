export default (sequelize, DataTypes) => {
  const Gamification = sequelize.define('Gamification', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
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
    }
  }, {
    tableName: 'gamifications',
    timestamps: true,
    hooks: {
      beforeUpdate: (gamification) => {
        gamification.level = Math.floor(gamification.points / 50) + 1;
      }
    }
  });

  return Gamification;
};
