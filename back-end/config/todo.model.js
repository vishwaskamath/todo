const { DataTypes } = require("sequelize");
const newSequelize = require("./db");

const Todo = newSequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "todos",
  }
);

module.exports = Todo;
