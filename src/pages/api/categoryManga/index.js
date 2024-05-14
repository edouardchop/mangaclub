
import  MangaCategory  from "../../../api/db/models/MangaCategoryModel"   
const {sequelize} = require( "../../../api/db/newSequelize")
const ensureDatabaseConnection = async () => {
  try {
    console.log( 'Connexion à la base de données établie avec succès.')
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
    throw error;
  }
}

/* donne les mangas associé à chaque catégorie*/
const handler=async(req,res)=>{
if ( req.method === 'GET' )
{
  try
  {
    await sequelize.authenticate();
    const allMangaCategories = await MangaCategory.findAll()
    res.send({ result: allMangaCategories })
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories', error);
    res.send({error:error}) // Vous pouvez gérer l'erreur en conséquence
  }
}/*
if ( req.method === 'POST' )
{
  try
  {
    await sequelize.authenticate();
    const newCategory = await MangaCategory.create(
      {
        manga_id: req.body.name,
        category_id:req.body.category,
      }
    )
  }
    catch ( error )
  {res.send( { error: error } )}
}*/
}

/*
const getAll = async (req,res) => {
  try {
      const allCategories = await categoryModel.findAll()
      console.log("voici les categories dans getAll:",categoryModel)
      res.send({ result: allCategories })
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories', error);
    res.send({error:error}) // Vous pouvez gérer l'erreur en conséquence
  }
};



const categoryModel = require('../../../api/db/models/categoryModel');
const sequelize = require( "../../../api/db/utils/newSequelize" )

const getAll = async (req,res) => {
  try
  {
        await sequelize.authenticate();
      const allCategories = await categoryModel.findAll()
      console.log("voici les categories dans getAll:",categoryModel)
      res.send({ result: allCategories })
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories', error);
    res.send({error:error}) // Vous pouvez gérer l'erreur en conséquence
  }
};
*/

export default handler
//export default ensureDatabaseConnection