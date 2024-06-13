 const  getTag=  (manga,categories,categoryManga ) =>
{
    let categoryTab = []
    const categoryMangaId =  categoryManga.filter( one => one.mangaId == manga.id )
    for ( let i = 0; i < categoryMangaId.length; i++ )
    {
        const idCategory = categories.filter( category => category.id == categoryMangaId[ i ].categoryId )
        const resulCategory = idCategory[0].name
        categoryTab.push(resulCategory)
    }
    return[categoryTab[0],categoryTab[1] ]

}
export default getTag
