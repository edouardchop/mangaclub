const { sequelize } = require('@/api/db/newSequelize');
import MangaCategory from '@/api/db/models/MangaCategoryModel';
import Manga from '@/api/db/models/mangaModel';
import xss from 'xss';

async function handler(req, res) {
  const categoryId = xss(req.query.id)

  if (req.method === 'GET') {
    try {
      await sequelize.authenticate();
      const mangaCategories = await MangaCategory.findAll({
        where: {
          categoryId: categoryId
        }
      });
      const mangaIds = mangaCategories.map(category => category.mangaId);
      const mangas = await Manga.findAll({
        where: {
          id: mangaIds
        }
      });
      res.status(200).json(mangas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des categories." });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
