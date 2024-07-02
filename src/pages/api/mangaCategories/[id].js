const { sequelize } = require( "@/api/db/newSequelize" )
import  MangaCategory from '@/api/db/models/MangaCategoryModel'
import Category from '@/api/db/models/categoryModel'

/* donne les catégories associés à chaque manga*/

async function handler ( req, res )
{
  const mangaId = req.query.id
  if ( req.method === "GET" )
{
  try
  {
    const mangaCategories = await MangaCategory.findAll( {
      where: {
        mangaId: mangaId
      }
    } )
    const categoryIds = mangaCategories.map( category => category.categoryId );
    const category = await Category.findAll( {
      where: {
        id: categoryIds
      }
    } );
    res.status( 200 ).json( category );
  } catch ( error )
  {
    console.error( error );
    res.status( 500 ).json( { message: "Une erreur s'est produite lors de la récupération des mangas." } );
  }

}

}

export default handler