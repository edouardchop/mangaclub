
const { DataTypes} = require( 'sequelize' );
const sequelize = require( "../utils/newSequelize" )

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
    type: DataTypes.DATE, // Assurez-vous que le type est correct
    field: 'created_at', // Spécifiez le nom de colonne utilisé dans PostgreSQL
  },
  updatedAt: {
    type: DataTypes.DATE, // Assurez-vous que le type est correct
    field: 'updated_at', // Spécifiez le nom de colonne utilisé dans PostgreSQL
  },
});

categoryModel.sync();
module.exports = categoryModel
