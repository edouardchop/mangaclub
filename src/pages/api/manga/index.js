import mangaModel from '../../../api/db/models/mangaModel';
import userModel from '../../../api/db/models/userModel'; // Importer le modèle utilisateur
const { sequelize } = require('../../../api/db/newSequelize');
import xss from 'xss';

const ensureDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
    throw error;
  }
};

const requestManga = async (req, res) => {
if (req.method === 'GET') {
    try {
      await ensureDatabaseConnection();
      const { userId } = req.query

      const queryOptions = {
        include: [{
          model: userModel,
          attributes: ['id', 'username', 'email'] 
        }]
      };

      if (userId) {
        queryOptions.where = {
          userId: xss(userId)
        };
      }

      const allMangas = await mangaModel.findAll(queryOptions);
      res.status(200).json({ result: allMangas });
    } catch (error) {
      console.error('Erreur lors de la récupération des mangas', error);
      res.status(500).json({ error: 'An error occurred while retrieving mangas' });
    }
  } else if (req.method === 'POST') {
    try {
      await ensureDatabaseConnection();
      const sanitizedData = {
        name: xss(req.body.name),
        description: xss(req.body.description),
        userId: xss(req.body.userId),
        source: xss(req.body.source),
        rate: xss(req.body.rate),
      };

      const user = await userModel.findByPk(sanitizedData.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newManga = await mangaModel.create(sanitizedData);
      res.status(201).json({ result: newManga });
    } catch (error) {
      console.error('Erreur lors de la création du manga', error);
      res.status(500).json({ error: 'An error occurred while creating the manga' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default requestManga;
