import axios from "axios";
import Navbar from "../components/Navbar"
import OneManga from "@/components/OneManga"
import {useState} from "react";
import Tag from "@/components/Tag";
import Filter from "@/components/Filter";
import Search from "@/components/Search";
import VerticalBar from "@/components/VerticalBar";

export const getServerSideProps = async ({ params }) => {

  const categoryResponse = await axios.get( "http://localhost:3000/api/category" )
  const { data: categoryData } = categoryResponse
  const mangaResponse = await axios.get( "http://localhost:3000/api/manga" )
  const { data: mangaData } = mangaResponse


  return {
    props: {
      category: categoryData.result,
      manga: mangaData.result

    }
  }
}
export default function Home (props)
{
  const categories = props.category
  const mangas = props.manga
  const [ filteredMangaData, setFilteredMangaData ] = useState(mangas)
  const [ NoManga, setNoManga ] = useState( false )
  const [ textSearch, setTextSearch ] = useState( 0 )
const [showRightBar,setShowRightBar]=useState(false)
console.log("voici les catégories : ",categories)
  /*
  const handleSearch = ( e ) =>
  {setNoManga(false)
    const searchData = allMangaData.filter( ( element ) => element.tag1 === e.target.value || element.tag2 === e.target.value)
    setFilteredMangaData( searchData )
    if ( searchData.length == 0 )
    {
      setNoManga(true)
    }
  }
  */
  const handleInputChange = ( e ) =>
  {setNoManga(false)
 
      const value = e.target.value
      setTextSearch( value )
      console.log( "voici la value : ", textSearch )
    if ( value.length == 0 )
    {
      setNoManga(true)
    }
  }

    const handleSearchPartial = ( e ) =>
    {
    setNoManga( false )
      const searchData = categories.filter( ( element ) => element.tag1 === e.target.value || element.tag2 === e.target.value )
      setFilteredMangaData( searchData )
      setTextSearch(e.target.value)

    if ( searchData.length == 0 )
    {
      setTextSearch()
      setNoManga(true)
    }
    }

    const handleTag = (element) =>
  {setNoManga( false )
    const searchData = mangas.filter( ( manga ) => element === manga.tag1|| element === manga.tag2)
      setFilteredMangaData( searchData )
      setTextSearch( element )
      if ( searchData.length == 0 )
    {
      setNoManga(true)
    }
      

  }
  const filterAllManga = () =>
  {
    setFilteredMangaData( categories )
    setTextSearch( "Tout les mangas" )
    setNoManga(false)
    
  }

  return (
    <div>
      <Navbar onClick={ () => setShowRightBar( !showRightBar ) } /> 
      { showRightBar && <VerticalBar onClick={ () => setShowRightBar( !showRightBar ) } />}
      <h1 className="py-10 text-4xl font-bold text-black text-center">{ textSearch == 0 ? "Tout les mangas" : textSearch }</h1>
      <div className="md:flex justify-between ms-12 md:ms-36 me-36">
      <Search onClick={ handleTag }  onKeyDown={ ( e ) => { if ( e.key == "Enter" ) { handleSearchPartial( e ) } } } /> 
      <div className="flex">
          <Tag onClick={filterAllManga} key={ "all" } tag={ "all" } />
      <Tag onClick={ () => handleTag( "Aventure" ) } key={ "aventureFilter" } tag={ "Aventure" } />
      <Tag onClick={ () => handleTag( "Romance" ) } key={ "romanceFilter" } tag={ "Romance" } />
      <Tag onClick={ () => handleTag( "Shonen" ) } key={ "shonenFilter" } tag={ "Shonen" } />
      </div>  
        <Filter onChange={ ( e ) => { { handleSearchPartial( e ) } } } onKeyDown={ ( e ) => { if ( e.key == "Enter" ) { handleSearchPartial( e ) } } } />
    </div>
    <div>
        { !NoManga &&
          <div className="flex flex-wrap justify-center md:justify-start pt-24">
            { filteredMangaData.map( ( manga ) => (
              <div className="mx-2 hover:scale-110" key={ manga.id }>
                <OneManga { ...manga }>
                  <Tag onClick={ () => handleTag( manga.tag1 ) } key={ manga.tag1 } tag={ manga.tag1 } />
                  <Tag onClick={ () => handleTag( manga.tag2 ) } key={ manga.tag2 } tag={ manga.tag2 } />
                </OneManga> 
             </div>
                                                  )
                                    )
            }
          </div> }
        { NoManga && <div className="text-center pt-36 text-2xl font-bold">No Manga Found</div> }
     </div>
</div>
)
}

