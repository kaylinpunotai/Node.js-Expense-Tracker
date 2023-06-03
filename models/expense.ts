const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/sequelize/postgresql-connection");
const User = require("./user.ts");

const Expense = sequelize.define("Expense", {
  // Model attributes
  expense_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
    default: 0.00,
  },
  category: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  transaction_date: {
    type: DataTypes.DATE,
  },
  create_timestamp: {
    type: DataTypes.DATE,
  },
  merchant: {
    type: DataTypes.STRING,
  },
  notes: {
    type: DataTypes.STRING,
  },
  charged_account_name: {
    type: DataTypes.STRING,
  },
  update_timestamp: {
    type: DataTypes.DATE,
  }
}, {
  // Other model options
  tableName: "Expenses",
  timestamps: true,
  createdAt: "create_timestamp",
  updatedAt: "update_timestamp",
});

User.hasMany(Expense, { 
  foreignKey: "user_id",
  onDelete: "CASCADE", 
});

module.exports = Expense;
