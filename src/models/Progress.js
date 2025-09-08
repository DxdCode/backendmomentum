// src/models/Progress.js
export default (sequelize, DataTypes) => {
  const Progress = sequelize.define('Progress', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    habitId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(
        'no_iniciado',
        'pendiente',
        'en_progreso',
        'con_dificultades',
        'completado',
        'omitido'
      ),
      allowNull: false,
      defaultValue: 'no_iniciado'
    },
    pointsEarned: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'progress',
    timestamps: true
  });

  return Progress;
};
