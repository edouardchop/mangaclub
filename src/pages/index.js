import allMangaData from "../backOffice/mangas"
import Navbar from "../components/Navbar"
import OneManga from "@/components/OneManga"
import { useState } from "react";
import mangas from "../backOffice/mangas"
import Tag from "@/components/Tag";
import Filter from "@/components/Filter";
import Search from "@/components/Search";

export default function Home ()
{
  const [ filteredMangaData, setFilteredMangaData ] = useState( allMangaData )
  const [ NoManga, setNoManga ] = useState( false )
  const [textSearch,setTextSearch]=useState(0)

  
  const handleSearch = ( e ) =>
  {setNoManga(false)
    const searchData = allMangaData.filter( ( element ) => element.tag1 === e.target.value || element.tag2 === e.target.value)
    setFilteredMangaData( searchData )
    if ( searchData.length == 0 )
    {
      setNoManga(true)
    }
  }
  
      const handleInputChange = (e) => {
    const value = e.target.value;
      setTextSearch( value );
      console.log("voici la value : ",textSearch)
      }
  
    const handleSearchPartial = ( e ) =>
    {
    setNoManga( false )
      const searchData = allMangaData.filter( ( element ) => element.tag1 === e.target.value || element.tag2 === e.target.value )
      setFilteredMangaData( searchData )
      setTextSearch(e.target.value)

    if ( searchData.length == 0 )
    {
      setNoManga(true)
    }
    }

    const handleTag = (element) =>
  {
    const searchData = mangas.filter( ( manga ) => element === manga.tag1|| element === manga.tag2)
      setFilteredMangaData( searchData )
      setTextSearch(element)

  }
  
  return (
    <div> 
      <Navbar onSearch={ handleSearch } onFilter={ handleTag } />
      <h1 className="py-10 text-4xl font-bold text-black text-center">{ textSearch == 0 ? "Tout les mangas" : textSearch }</h1>
      <div className="md:flex justify-between ms-12 md:ms-36 me-36">
      <Search onClick={ () => handleTag( textSearch ) } onChange={ handleInputChange } onKeyDown={ ( e ) => { if ( e.key == "Enter" ) { handleSearchPartial( e ) } } } /> 
      <div className="flex">
          <Tag onClick={ () => { setFilteredMangaData( allMangaData ),setTextSearch("Tout les mangas") } } key={ "all" } tag={ "all" } />
      <Tag onClick={ () => handleTag( "aventure" ) } key={ "aventureFilter" } tag={ "aventure" } />
      <Tag onClick={ () => handleTag( "romance" ) } key={ "romanceFilter" } tag={ "romance" } />
      <Tag onClick={ () => handleTag( "shonen" ) } key={ "shonenFilter" } tag={ "shonen" } />
      </div>  
        <Filter onClick={ ( e ) => { handleSearchPartial( e )} } onKeyDown={ ( e ) => { if ( e.key == "Enter" ) {handleSearchPartial( e )} } } />
    </div>
    <div>
        { !NoManga &&
          <div className="flex flex-wrap justify-center md:justify-start pt-24">
            { filteredMangaData.map( ( manga ) => (
              <div className="mx-2" key={ manga.id }>
                <OneManga { ...manga }>
                  <Tag onClick={ () => handleTag( manga.tag1 ) } key={ manga.tag1 } tag={ manga.tag1 } />
                  <Tag onClick={ () => handleTag( manga.tag2 ) } key={ manga.tag2 } tag={ manga.tag2 } />
                </OneManga> 
             </div>
                                                  )
                                    )
            }
          </div> }
        { NoManga && <div>No Manga Found</div> }
     </div>
</div>
)
}
