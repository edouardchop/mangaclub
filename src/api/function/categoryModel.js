/*
const getMangaByCategory = async( manga,categories,categoryManga ) =>
{
    let result = []
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

export default getMangaByCategory
*/
const getCategoryByManga= async (manga,categories,categoryManga ) =>
{
    let categoryTab = []
    console.log("manga : ",manga)
    const categoryMangaId = categoryManga.filter( categoryManga => categoryManga.mangaId == manga.id )
    console.log( "la categorie recherché : ", categoryMangaId )
    for ( let i = 0; i < categoryMangaId.length; i++ )
    {
        const idCategory = categories.filter( category => category.id == categoryMangaId[ i ].categoryId )
        const resulCategory = idCategory[0].name
        categoryTab.push(resulCategory)
    }
    console.log( "la categorie recherché 2 : ", categoryTab )
    return[categoryTab[0],categoryTab[1] ]

}
export default getCategoryByManga

/*
const getmangaAction = async ( req, res ) =>
{let result=[]
  const action = await categoryModel.findOne( { where: { name: 'Action' } } );
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
export default getmangaAction*/