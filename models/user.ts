const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/sequelize/postgresql-connection");

const User = sequelize.define("User", {
  // Model attributes
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  create_timestamp: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  // Other model options
  tableName: "Users",
  timestamps: true,
  createdAt: "create_timestamp",
  updatedAt: false
});

module.exports = User;

