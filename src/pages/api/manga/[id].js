const { sequelize } = require("../../../api/db/newSequelize");
import Manga from '../../../api/db/models/mangaModel';
import xss from 'xss';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const mangaId = xss(req.query.id); // Sanitize input
    try {
      await sequelize.authenticate();
      const manga = await Manga.findByPk(mangaId);
      if (manga) {
        res.status(200).json({ result: manga });
      } else {
        res.status(404).json({ error: 'Manga not found' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des mangas', error);
      res.status(500).json({ error: 'An error occurred while retrieving the manga' });
    }
  } else if (req.method === 'DELETE') {
    const mangaId = xss(req.query.id); // Sanitize input
    try {
      await sequelize.authenticate();
      const deleteManga = await Manga.destroy({ where: { id: mangaId } });
      if (deleteManga) {
        res.status(200).json({ message: 'Manga deleted successfully' });
      } else {
        res.status(404).json({ error: 'Manga not found' });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du manga', error);
      res.status(500).json({ error: 'An error occurred while deleting the manga' });
    }
  } else if (req.method === 'PUT') { 
    const mangaId = xss(req.query.id)
    const { description } = req.body
    try {
      await sequelize.authenticate();
      const updateManga = await Manga.update({ description }, { where: { id: mangaId } });
      if (updateManga[0] === 1) {
        res.status(200).json({ message: 'Manga updated successfully' });
      } else {
        res.status(404).json({ error: 'Manga not found' });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du manga', error);
      res.status(500).json({ error: 'An error occurred while updating the manga' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
