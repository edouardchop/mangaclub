// mangaCategoryModel.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../newSequelize');

const MangaCategory = sequelize.define('MangaCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mangaId: {
    type: DataTypes.INTEGER,
    field:"manga_id",
    allowNull: false,
    references: {
      model: 'mangas', 
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    field:"category_id",
    allowNull: false,
    references: {
      model: 'categories', 
      key: 'id',
    },
  },
   createdAt: {
    type: DataTypes.DATE, 
    field: 'created_at', 
  },
  updatedAt: {
    type: DataTypes.DATE, 
    field: 'updated_at', 
  },
  
},
{
  tableName: 'MangaCategory', // Définissez le nom de la table ici si nécessaire
  } );

export default MangaCategory;