'use strict';

const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/db/config.js')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = {
  Score: sequelize.define("Score", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    }
  })
}