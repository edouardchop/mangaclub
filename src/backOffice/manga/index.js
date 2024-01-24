import onepiece from "public/images/onepiece.png"
import bleach from "/public/images/bleach.jpg"
import naruto2 from "/public/images/naruto2.jpg"

import mangaModel from "@/api/db/models/mangaModel"
const sequelize = require( "../../api/db/newSequelize")

const allMangaData = [
  { id:"1", rate: "5", source: onepiece, name: "bleach", tag1: "Action", tag2: "Romance" },
  { id:"2",rate: "3", source: bleach, name: "one piece", tag1: "Romance", tag2: "Action" },
  { id:"3",rate: "4", source: naruto2, name: "naruto", tag1: "Romance", tag2: "Action" },
  { id:"4",rate: "3", source: naruto2, name: "one piece", tag1: "Romance", tag2: "Action" },
   { id:"5",rate: "5", source: onepiece, name: "bleach", tag1: "Comédie", tag2: "Romance" },
  { id:"6",rate: "3", source: bleach, name: "one piece", tag1: "romance", tag2: "Action" },
  { id:"7",rate: "4", source: naruto2, name: "naruto", tag1: "Romance", tag2: "Action" },
  { id:"8",rate: "3", source: naruto2, name: "one piece", tag1: "Aventure", tag2: "Action" },
   {id:"9", rate: "5", source: onepiece, name: "bleach", tag1: "Shonen", tag2: "Romance" },
  { id:"10",rate: "3", source: bleach, name: "one piece", tag1: "Romance", tag2: "Action" },
  { id:"11",rate: "4", source: naruto2, name: "naruto", tag1: "Romance", tag2: "Shonen" },
  { id:"12",rate: "3", source: naruto2, name: "one piece", tag1: "Romance", tag2: "Action" }

];



const ensureDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log( 'Connexion à la base de données établie avec succès.')
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
    throw error;
  }
};


const getAll = async (req,res) => {
  try
  {
    await sequelize.authenticate();
    console.log("on est identifé")
      const allMangas = await mangaModel.findAll()
      console.log("voici les mangas dans getAll:",mangaModel)
      res.send({ result: allMangas })
  } catch (error) {
    console.error('Erreur lors de la récupération des mangas', error);
    res.send({error:error}) // Vous pouvez gérer l'erreur en conséquence
  }
};
export default getAll