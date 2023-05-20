const { Sequelize } = require("sequelize");

require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});


const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
  dialect: 'mysql',
  logging: true,
  host: 'db',
  port: 3306,
});

module.exports = sequelize;
