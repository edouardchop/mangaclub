
const { categoryModel,mangaModel,MangaCategory} = require('../../../api/db/models/categoryModel');

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

export default ensureDatabaseConnection