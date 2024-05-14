// Dans le fichier où vous définissez vos associations (peut être appelé associations.js ou similaire)

// associations.js
const  categoryModel  = require('./categoryModel');
import  mangaModel from './mangaModel' 
import MangaCategory from './MangaCategoryModel' 
/*
mangaModel.belongsToMany( categoryModel, { through: MangaCategory } );
categoryModel.belongsToMany(mangaModel, { through: MangaCategory });
categoryModel.belongsTo(models.mangaModel, { foreignKey: 'id', targetKey: 'mangaId', as: 'mangas' });
categoryModel.belongsTo(models.categoryModel, { foreignKey: 'categoryModel', targetKey: 'categoryId', as: 'categories' });

MangaCategory.associate = (models) => {
  MangaCategory.belongsTo(models.mangaModel, { foreignKey: 'mangaId', targetKey: 'id', as: 'mangas' });
  MangaCategory.belongsTo(models.categoryModel, { foreignKey: 'categoryId', targetKey: 'id', as: 'categories' });
}

categoryModel.associate = (models) => {
categoryModel.belongsToMany(models.mangaModel, { as: 'categoriesInManga', through: models.MangaCategory, foreignKey: 'categoryId'});
}

mangaModel.associate = (models) => {
mangaModel.belongsToMany(models.categoryModel, { as: 'mangasInCategorie', through: models.MangaCategory, foreignKey: 'mangaId'});
}*/
mangaModel.belongsToMany(categoryModel, { through: MangaCategory })
categoryModel.belongsToMany( mangaModel, { through: MangaCategory } )

module.exports = { categoryModel, mangaModel, MangaCategory };
