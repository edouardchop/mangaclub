
const { categoryModel,mangaModel,MangaCategory} = require('../../api/db/models/association');

const ensureDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log( 'Connexion à la base de données établie avec succès.')
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
    throw error;
  }
};


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

const getmangaAction = async ( req, res ) =>
{let result=[]
  const action = await categoryModel.findOne( { where: { name: 'Action' } } );
  const mangaAction = await MangaCategory.findAll( { where: { categoryId: action.id } } )
  const mangaIdAction = mangaAction.map( manga => manga.mangaId )
  for ( let i = 0; i < mangaIdAction.length; i++ )
  {
    const manga = await mangaModel.findOne( { where: { id: mangaIdAction[ i ] } } )
    const name = manga.name
    result.push(name)
  }
  res.send(result)
}
// Exportez la fonction getAll
export default getmangaAction