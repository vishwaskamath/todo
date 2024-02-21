const { Sequelize } = require("sequelize");

const newSequelize = new Sequelize("todo", "root", "vis123", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
});

module.exports = newSequelize;
