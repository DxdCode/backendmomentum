import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  history: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    defaultValue: []
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true
  }
},
  {
    tableName: "users",
    timestamps: true
  }
);

//Método para agregar acción 
User.prototype.addHistory = async function (action) {
  this.history = [...this.history, { date: new Date(), action }];
  await this.save();
};

//Excluir password 
User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

export default User;
