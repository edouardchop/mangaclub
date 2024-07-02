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
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
  },
});

userModel.sync();
export default userModel