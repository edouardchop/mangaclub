const { DataTypes} = require( 'sequelize' )
import { sequelize } from'../newSequelize'

const userModel = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    role: {
    type: DataTypes.ENUM("user","admin","superadmin"),
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

userModel.sync();
export default userModel