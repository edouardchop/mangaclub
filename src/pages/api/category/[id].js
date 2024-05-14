const { sequelize } = require( "../../../api/db/newSequelize" )
import  MangaCategory from '../../../api/db/models/MangaCategoryModel'
import  Manga  from '../../../api/db/models/mangaModel'


/* On affiche les MANGAS associés à chaque catégories*/
async function handler ( req, res )
{
  const categoryId = req.query.id 
  if ( req.method === 'GET' )
  {
    try
    {
      const mangaCategories = await MangaCategory.findAll( {
        where: {
          categoryId: categoryId
        }
      } )
      const mangaIds = mangaCategories.map( category => category.mangaId );
      console.log( "mangaIds", mangaIds )
      const mangas = await Manga.findAll( {
        where: {
          id: mangaIds
        }
      } );
      res.status( 200 ).json( mangas );
    } catch ( error )
    {
      console.error( error );
      res.status( 500 ).json( { message: "Une erreur s'est produite lors de la récupération des category." } );
    }
  }
}

    
export default handler