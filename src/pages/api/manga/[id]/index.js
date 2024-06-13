import mangaModel from '../../../../api/db/models/mangaModel'
import MangaCategory from '@/api/db/models/MangaCategoryModel'
import categoryModel from '@/api/db/models/categoryModel'
const { sequelize } = require( '../../../../api/db/newSequelize' )

const requestOneManga = async ( req, res ) =>
{
    if ( req.method === 'GET' )
    {
        try
        {
            await sequelize.authenticate();
            const oneManga = await mangaModel.findByPk( req.query.id )
            console.log("oneManga: " + oneManga)
                const categoryId = MangaCategory.map(manga => manga.categoryId);
    console.log("categoryId", categoryId)
    const mangas = await mangaModel.findAll({
      where: {
        id: categoryId
      }
    });
    res.status(200).json(mangas);
            res.send( { result: oneManga } )
            
        } catch ( error )
        {
            console.error( 'Erreur lors de la récupération des mangas', error );
            res.send( { error: error } ) // Vous pouvez gérer l'erreur en conséquence
        }
  
    }
}

export default requestOneManga