
const  categoryModel  = require('./categoryModel');
import  mangaModel from './mangaModel' 
import MangaCategory from './MangaCategoryModel' 

mangaModel.belongsToMany(categoryModel, { through: MangaCategory })
categoryModel.belongsToMany( mangaModel, { through: MangaCategory } )

module.exports = { categoryModel, mangaModel, MangaCategory };

