import mangaModel from '../../../api/db/models/mangaModel';
const {sequelize} = require('../../../api/db/newSequelize')

const ensureDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log( 'Connexion à la base de données établie avec succès.')
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
    throw error;
  }
};

const requestManga = async ( req, res ) =>
{
if ( req.method === 'GET' )
{  
    try
    {
      await sequelize.authenticate();
      const allMangas = await mangaModel.findAll()
      console.log( "voici les mangas dans getAll:", mangaModel )
      res.send( { result: allMangas } )
    } catch ( error )
    {
      console.error( 'Erreur lors de la récupération des mangas', error );
      res.send( { error: error } ) // Vous pouvez gérer l'erreur en conséquence
    }
  
}
else if ( req.method === 'POST' )
{

    await sequelize.authenticate();
    const newManga = await mangaModel.create(
      {
        name: req.body.name,
        rate: req.body.name,
        source: req.body.name,
  
      }
    )
}
}
export default requestManga