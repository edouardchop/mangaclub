
const categoryModel = require( "../../../api/db/models/categoryModel" )  
const {sequelize} = require( "../../../api/db/newSequelize")
    
const handler=async(req,res)=>{
if ( req.method === 'GET' )
{

    try
    {
      await sequelize.authenticate();
      const allCategories = await categoryModel.findAll()
      console.log( "voici les categories dans getAll:", categoryModel )
      res.send( { result: allCategories } )
    } catch ( error )
    {
      console.error( 'Erreur lors de la récupération des catégories', error );
      res.send( { error: error } ) // Vous pouvez gérer l'erreur en conséquence
    }
}
if ( req.method === 'POST' )
{
  try
  {
    await sequelize.authenticate();
    const newCategory = await categoryModel.create(
      {
        name:req.body.name,
      }
    )
  }
    catch ( error )
  {res.send( { error: error } )}
}
}
/*
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
*/
export default handler
//export default ensureDatabaseConnection