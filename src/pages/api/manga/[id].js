import mangaModel from '../../../api/db/models/mangaModel';
const { sequelize } = require( '../../../api/db/newSequelize' )

const requestOneManga = async ( req, res ) =>
{
    if ( req.method === 'GET' )
    {
        try
        {
            await sequelize.authenticate();
            const oneManga = await mangaModel.findByPk(req.query.id)
            res.send( { result: oneManga } )
        } catch ( error )
        {
            console.error( 'Erreur lors de la récupération des mangas', error );
            res.send( { error: error } ) // Vous pouvez gérer l'erreur en conséquence
        }
  
    }
}

export default requestOneManga