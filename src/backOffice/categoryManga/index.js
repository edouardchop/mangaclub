import categoryModel from "@/api/db/models/categoryModel";
import mangaModel from "@/api/db/models/mangaModel";
import MangaCategory from "@/api/db/models/MangaCategoryModel"
const getMangaByCategory = async ( req, res, category ) =>
{let result=[]
  const nameCategory = await categoryModel.findOne( { where: { name:{category} } } );
  const allManga = await MangaCategory.findAll( { where: { categoryId: nameCategory.id } } )
  const allMangaId = allManga.map( manga => manga.mangaId )
  for ( let i = 0; i < allMangaId.length; i++ )
  {
    const manga = await mangaModel.findOne( { where: { id: allMangaId[ i ] } } )
    const name = manga.name
    result.push(name)
  }
  res.send(result)
}

getCateogryByManga= async ( req, res,manga ) =>
{let result=[]
  const nameManga = await mangaModel.findOne( { where: { name:{manga}} } );
  const getCategory = await MangaCategory.findAll( { where: { mangaId: nameManga.id } } )
  const getCategoryId = getCategory.map( manga => manga.mangaId )
  for ( let i = 0; i < getCategoryId.length; i++ )
  {
    const category = await categoryModel.findOne( { where: { id: getCategoryId[ i ] } } )
    const name = category.name
    result.push(name)
  }
  res.send(result)
}
export default { getMangaByCategory, getCategoryByManga }
