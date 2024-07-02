import MangaCategory from '../../../api/db/models/MangaCategoryModel';
const { sequelize } = require('../../../api/db/newSequelize');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      await sequelize.authenticate();

      const newCategory = await MangaCategory.create({
        mangaId: req.body.mangaId,
        categoryId: req.body.categoryId
      });

      res.status(200).send("La catégorie a été associée avec succès");
    } catch (error) {
      console.error('Erreur lors de l\'association de la catégorie', error);
      res.status(500).send({ error: 'Erreur lors de l\'association de la catégorie' });
    }
  }

  if (req.method === 'GET') {
    try {
      await sequelize.authenticate();
      const allMangaCategories = await MangaCategory.findAll();
      res.status(200).send({ result: allMangaCategories });
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories', error);
      res.status(500).send({ error: 'Erreur lors de la récupération des catégories' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await sequelize.authenticate();
      const categoryToDelete = await MangaCategory.findByPk(categoryId);
      if (!categoryToDelete) {
        res.status(404).send({ error: 'Catégorie non trouvée' });
        return;
      }

      await categoryToDelete.destroy();
      res.status(200).send({ message: 'Catégorie supprimée avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie', error);
      res.status(500).send({ error: 'Erreur lors de la suppression de la catégorie' });
    }
  }
};

export default handler;
