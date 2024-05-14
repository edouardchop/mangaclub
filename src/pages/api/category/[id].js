const { sequelize } = require( "@/api/db/newSequelize" )
import Category   from '@/api/db/models/categoryModel'



const handler = async ( req, res ) =>
{
    if ( req.method === 'GET' )
    {
        const categoryId = req.query.id
        try
        {
            await sequelize.authenticate();
            const manga = await Category.findByPk(categoryId);
            res.send( { result: manga } )
        } catch ( error )
        {
            console.error( 'Erreur lors de la récupération de la catégorie', error )
            res.send( { error: error } ) 
        }
  
    }
    if ( req.method === 'DELETE' )
    {
    await sequelize.authenticate();
        try
        {
        const deleteCategory = await Category.destroy( { where: { id: req.query.id, }, } )
         }
        catch ( error )
        {
            console.error( "Erreur lors de la suppresion du manga" )
            res.send( { error: error } )
        }
    }
}
export default handler