import { DataTypes } from 'sequelize';
import { sequelize } from '../newSequelize';
import userModel from './userModel';

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
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: 'id',
    },
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
    type: DataTypes.STRING,
  }
});

// Définir l'association
mangaModel.belongsTo(userModel, { foreignKey: 'userId' });
userModel.hasMany(mangaModel, { foreignKey: 'userId' });

export default mangaModel;
