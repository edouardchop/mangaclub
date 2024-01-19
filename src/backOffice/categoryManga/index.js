const getMangaByCateogry = async ( req, res,category ) =>
{let result=[]
  const action = await categoryModel.findOne( { where: { name:{category} } } );
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

getCateogryByManga= async ( req, res ) =>
{let result=[]
  const action = await mangaModel.findOne( { where: { name: 'Action' } } );
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
export default getmangaAction