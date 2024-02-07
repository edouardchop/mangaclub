// mangasModel.js
import { DataTypes } from 'sequelize';
const {sequelize} = require('../newSequelize');
const mangaModel = sequelize.define( 'mangas', {
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
  },
  source: {
    type:DataTypes.STRING,
  }
  
});

export default mangaModel
