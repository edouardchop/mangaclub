
const categoryModel = require('../../../api/db/models/categoryModel');
const sequelize = require( "../../../api/db/utils/newSequelize" )

const getAll = async (req,res) => {
  try
  {
        await sequelize.authenticate();
      const allCategories = await categoryModel.findAll()
      console.log("voici les categories dans getAll:",categoryModel)
      res.send({ result: allCategories })
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories', error);
    res.send({error:error}) // Vous pouvez gérer l'erreur en conséquence
  }
};

export default getAll