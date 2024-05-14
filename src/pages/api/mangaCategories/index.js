import MangaCategory from '../../../api/db/models/MangaCategoryModel';
const { sequelize } = require( '../../../api/db/newSequelize' )


const handler = async ( req, res ) =>
{
    if ( req.method === 'POST' )
    {
  try
  {
    await sequelize.authenticate();
    console.log( "succès jointure" )
    const newCategory = await MangaCategory.create(
      {
        mangaId:req.body.mangaId,
        categoryId:req.body.categoryId
      }
    )
    res.send("la catégorie a été associé avec succès")
  }
    catch ( error )
  {
    res.send( { error: error } )
    console.log("erreur")
      }
  }
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
}
}


export default handler