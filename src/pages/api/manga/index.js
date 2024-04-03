import mangaModel from '../../../api/db/models/mangaModel';
const {sequelize} = require('../../../api/db/newSequelize')

const ensureDatabaseConnection = async () => {
  try
  {
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
      res.send( { result: allMangas } )
    } catch ( error )
    {
      console.error( 'Erreur lors de la récupération des mangas', error );
      res.send( { error: error } ) // Vous pouvez gérer l'erreur en conséquence
    }
  
  }
  else if ( req.method === 'POST' )
  {
    try
    {
      await sequelize.authenticate();
      const newManga = await mangaModel.create(
        {
          name: req.body.name,
          source: req.body.source,
          rate: req.body.rate,
        }
      )
    }
    catch(error){res.send({error:error})}
}
}
export default requestManga