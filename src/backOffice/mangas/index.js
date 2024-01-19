import onepiece from "public/images/onepiece.png"
import bleach from "/public/images/bleach.jpg"
import naruto2 from "/public/images/naruto2.jpg"
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


const getmangaAction = async ( req, res,category ) =>
{let result=[]
  const action = await categoryModel.findOne( { where: { name: {cateogry} } } );
  const mangaAction = await MangaCategory.findAll( { where: { categoryId: action.id } } )
  const mangaIdAction = mangaAction.map( manga => manga.mangaId )
  for ( let i = 0; i < mangaIdAction.length; i++ )
  {
    const manga = await mangaModel.findOne( { where: { id: mangaIdAction[ i ] } } )
    const name = manga.name
    result.push(name)
  }
  res.send(result)
}
// Exportez la fonction getAll
export default getmangaAction