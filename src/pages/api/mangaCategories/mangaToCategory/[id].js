const { sequelize } = require('@/api/db/newSequelize');
import MangaCategory from '@/api/db/models/MangaCategoryModel';
import Category from '@/api/db/models/categoryModel';
import xss from 'xss';

async function handler(req, res) {
  const mangaId = xss(req.query.id)

  if (req.method === 'GET') {
    try {
      const mangaCategories = await MangaCategory.findAll({
        where: {
          mangaId: mangaId
        }
      });
      const categoryIds = mangaCategories.map(category => category.categoryId);
      const categories = await Category.findAll({
        where: {
          id: categoryIds
        }
      });
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des catégories." });
    }
  } else if (req.method === 'DELETE') {
    try {
      const categoryId = xss(req.body.categoryId)
      await MangaCategory.destroy({
        where: {
          mangaId: mangaId,
          categoryId: categoryId
        }
      });
      res.status(200).json({ message: 'Category association with manga deleted successfully' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie liée au manga :', error);
      res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de la catégorie liée au manga." });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
