const { sequelize } = require( "../../../api/db/newSequelize" )
import  Manga  from '../../../api/db/models/mangaModel'



const handler = async ( req, res ) =>
{
    if ( req.method === 'GET' )
    {
        const mangaId = req.query.id
        try
        {
            await sequelize.authenticate();
            const manga = await Manga.findByPk(mangaId);
            res.send( { result: manga } )
        } catch ( error )
        {
            console.error( 'Erreur lors de la récupération des mangas', error )
            res.send( { error: error } ) 
        }
  
    }
    if ( req.method === 'DELETE' )
    {
        try
        {
            await sequelize.authenticate();
            const deleteManga = await Manga.destroy({ where: { id: req.query.id, },} )
         }
        catch ( error )
        {
            console.error( "Erreur lors de la suppresion du manga" )
            res.send( { error: error } )
        }
    }
}
export default handler