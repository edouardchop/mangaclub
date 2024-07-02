
const { DataTypes} = require( 'sequelize' );
const { sequelize } = require('../newSequelize')

const categoryModel = sequelize.define('categories', {
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
});

categoryModel.sync();
module.exports = categoryModel
