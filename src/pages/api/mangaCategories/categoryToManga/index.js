import MangaCategory from "@/api/db/models/MangaCategoryModel";
const { sequelize } = require("@/api/db/newSequelize");
import xss from 'xss';

const ensureDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
    throw error;
  }
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      await ensureDatabaseConnection();
      const allMangaCategories = await MangaCategory.findAll();
      res.status(200).json({ result: allMangaCategories });
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories', error);
      res.status(500).json({ error: 'An error occurred while retrieving categories' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};


export default handler;
