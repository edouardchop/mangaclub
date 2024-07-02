const categoryModel = require("../../../api/db/models/categoryModel");
const { sequelize } = require("../../../api/db/newSequelize");
const xss = require('xss');

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      await sequelize.authenticate();
      const allCategories = await categoryModel.findAll();
      res.status(200).json({ result: allCategories });
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories', error);
      res.status(500).json({ error: 'An error occurred while retrieving categories' });
    }
  } else if (req.method === 'POST') {
    try {
      await sequelize.authenticate();
      const sanitizedData = {
        name: xss(req.body.name)
      };
      const newCategory = await categoryModel.create(sanitizedData);
      res.status(201).json({ result: newCategory });
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie', error);
      res.status(500).json({ error: 'An error occurred while creating the category' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
