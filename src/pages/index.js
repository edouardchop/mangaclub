import axios from "axios";
import Navbar from "../components/Navbar"
import OneManga from "@/components/OneManga"
import {useState} from "react";
import Tag from "@/components/Tag";
import Filter from "@/components/Filter";
import Search from "@/components/Search";
import VerticalBar from "@/components/VerticalBar";
import getCategoryByManga from "@/api/function/categoryModel"
import MangaCategory from "./backOffice/manga";
import { AwsService } from "@/api/db/ServiceAws";
import Link from "next/link";
import { useRouter } from "next/router";

export const getServerSideProps = async () =>
{
  try
  {
    const allImages=[]
    const categoryResponse = await axios.get("http://localhost:3000/api/category");
    const { data: categoryData } = categoryResponse
    const mangaResponse = await axios.get("http://localhost:3000/api/manga");
    const { data: mangaData } = mangaResponse
    console.log( "manga response :", mangaData )
      const aws = new AwsService();
    for ( let i = 0; i < mangaData.result.length; i++ )
    {
      try
      {
        const lowerManga = mangaData.result[ i ].name.toLowerCase();
        const mangaName = lowerManga.replace( /\s+/g, '' );
        allImages.push(mangaName)
        const imageData = await aws.getFileStream( mangaName );
        console.log( "imageData :", imageData.file )
        console.log( "LA SOURCE : ", mangaData.result[ i ] )


      }
      catch ( error )
      {
        console.log("error")
      }
      }

    const categoryMangaResponse = await axios.get("http://localhost:3000/api/categoryManga");
    const { data: categoryManga } = categoryMangaResponse

    return {
      props: {
        category: categoryData.result,
        manga: mangaData.result,
        categoryManga: categoryManga.result,
        image:allImages,
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        category: [],
        manga: [],
        categoryManga: [],
        image:[],
      }
    };
  }
};

export default function Home ( props )
{
  const router = useRouter()
  const { category, manga, categoryManga,image } = props
  const [ filteredMangaData, setFilteredMangaData ] = useState( manga );
  const [NoManga, setNoManga] = useState(false);
  const [textSearch, setTextSearch] = useState("");
const [showRightBar,setShowRightBar]=useState(false)

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
      const searchData = category.filter( ( element ) => element.tag1 === e.target.value || element.tag2 === e.target.value )
      setFilteredMangaData( searchData )
      setTextSearch(e.target.value)

    if ( searchData.length == 0 )
    {
      setTextSearch()
      setNoManga(true)
    }
    }

    const handleTag = (element) =>
    {
      setNoManga( false )
      console.log( "mangas :", manga )
      console.log( "element : ", element )
      console.log( "categories ;", category )
      const categorySearch = category.filter( item => item.name == element )
      console.log( "lalalal :", categorySearch )
      const transTab = categoryManga.filter( mix => mix.categoryId == categorySearch.id )
            console.log( "lalalal :", transTab )

      setTextSearch( element )
      if ( manga.length == 0 )
    {
      setNoManga(true)
    }
      

  }
  const filterAllManga = () =>
  {
    setFilteredMangaData( category )
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
           {filteredMangaData.map((manga,index) => {
             const [ tag1, tag2 ] = getCategoryByManga( manga, category, categoryManga );
            return (
              <div className="mx-2 hover:scale-110" key={ manga.id }>
                <div type="button" onClick={() => router.push(`mangas/${manga.name}`)}>
                <OneManga src={ `https://mangaclubimage.s3.eu-north-1.amazonaws.com/${image[index]}` } { ...manga } onClick={()=> handleTag(tag1,tag2) } tag1={tag1} tag2={tag2} />
                </div>
              </div>
                  )
            })}
          </div> }
        { NoManga && <div className="text-center pt-36 text-2xl font-bold">No Manga Found</div> }
     </div>
</div>
)
}

