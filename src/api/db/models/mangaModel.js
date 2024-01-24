// mangasModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/newSequelize');

const mangaModel = sequelize.define('mangas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
  }
  
});

module.exports = mangaModel
