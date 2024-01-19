// Dans le fichier où vous définissez vos associations (peut être appelé associations.js ou similaire)

// associations.js
const  categoryModel  = require('./categoryModel');
const mangaModel  = require( './mangaModel' )
const MangaCategory = require( './MangaCategoryModel' )

mangaModel.belongsToMany( categoryModel, { through: MangaCategory } );
categoryModel.belongsToMany(mangaModel, { through: MangaCategory });


module.exports = { categoryModel, mangaModel, MangaCategory };
