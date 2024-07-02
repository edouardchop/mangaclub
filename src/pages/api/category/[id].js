const { sequelize } = require('@/api/db/newSequelize');
import Category from '@/api/db/models/categoryModel';
import xss from 'xss';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const categoryId = xss(req.query.id); // Sanitize the input
    try {
      await sequelize.authenticate();
      const category = await Category.findByPk(categoryId);
      if (category) {
        res.status(200).json({ result: category });
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la catégorie', error);
      res.status(500).json({ error: 'An error occurred while retrieving the category' });
    }
  } else if (req.method === 'DELETE') {
    const categoryId = xss(req.query.id); // Sanitize the input
    try {
      await sequelize.authenticate();
      const deleteCategory = await Category.destroy({ where: { id: categoryId } });
      if (deleteCategory) {
        res.status(200).json({ message: 'Category deleted successfully' });
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie', error);
      res.status(500).json({ error: 'An error occurred while deleting the category' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
