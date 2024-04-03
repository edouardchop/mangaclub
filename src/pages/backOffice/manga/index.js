import { useState } from "react"
import axios from 'axios';
import LineBackOffice from "@/components/LineBackOffice"
import Navbar from "@/components/Navbar";

export const getServerSideProps = async ( { params } ) =>
{
  try
  {
    const mangaResponse = await axios.get( " http://localhost:3000/api/manga/" )
    const { data: mangaData } = mangaResponse
    return ( {
      props: {
        manga: mangaData.result,

      }
    }
    )
  }
  catch ( error )
  {
    console.error( 'Error fetching image:', error.message );

  }
}


export default function Manga (props)
{

  const mangas = props.manga
const allManga=mangas.map(manga=>[manga.id,manga.name,manga.source])
const [ lines, setLines ] = useState( allManga )
const [addField,setAddField] = useState(false)
const [inputValue, setInputValue] = useState('');
const [selectedFile, setSelectedFile] = useState(null);
  const [ newText, setNewText ] = useState( "" )
  const [ newName, setNewName ] = useState( "" )
  
    const handleFileChange = ( event ) =>
    {
        console.log("change")
    const file = event.target.files[0];
        setSelectedFile( file )
        console.log(file)
  };

  console.log("lines : ",lines)
const uploadImage = () => {
    if ( selectedFile )
    {
      const reader = new FileReader();
        reader.onload = function ( event )
        {
            const content = event.target.result.split( ',' )[ 1 ];
            const bufParam = Buffer.from( content.replace( /^data:image\/\w+;base64,/, "" ), 'base64' )
            const params = {
                name:newText.replace( /\s/g, "" ),
                type:selectedFile.type,
                buf:bufParam
            }
 

            console.log( "les params dans LineBackOffice", params )
            axios.post( "../api/image/",  params )
        .then(response => {
            console.log( response.data );
            console.log("youhou")
        })
        .catch(error => {
          console.error('Erreur lors de l\'upload de l\'image:', error);
        });
      };

      reader.readAsDataURL(selectedFile);
  } else { console.log( "pas de fichier" ) }
}

  const deleteLine = ( line ) =>
  {
    const newLines = lines.filter( otherLine => otherLine[ 0]!= line[0] )
   setLines(newLines) 
  }
  
  const  changeName = async (line,e) =>
  {
    const otherLines = lines.filter( otherLine => otherLine[ 0 ] != line[ 0 ] )
    const newLine = [ line[ 0 ], e.target.value ]
    setNewText(e.target.value )
  
    const transLines = [ ...otherLines, newLine ]
    const sortedLines = transLines.sort((a, b) => a[0] - b[0]);
    setLines( sortedLines )

  }

  const handleNewName = async ( event ) =>
  {
    setInputValue( event.target.value )
    setNewText(event.target.value )
  }
  

  const sendMangaData = async () =>
  {

    try
    {
      if ( selectedFile )
      {
        const mangaResponse = await axios.post( 'http://localhost:3000/api/manga/', {
          name: newText,
          source: newText.replace( /\s/g, "" ),
          rate: 0
        } )
      }else{console.log("ca ne marche pas!")}
    } catch ( error )
    {
      console.error( 'Erreur lors de la récupération des données:', error )
      throw error
    }
  }

      const getMangaData = async () =>
  {
    try
    {

      const mangaResponse = await axios.get( 'http://localhost:3000/api/manga/')
      const mangaData = mangaResponse.data.result
      const newMangas=mangaData.map(manga=>[manga.id,manga.name,manga.source])
      setLines(newMangas)
    } catch ( error )
    {
      console.error( 'Erreur lors de la récupération des données:', error )
      throw error
    }
  }
return (

  <>
    <Navbar/>
        <div className="flex flex-col items-center">
    <h1 className="text-3xl pt-8">BackOffice Manga</h1>
    <buton className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded mt-12 mb-8" onClick={()=> setAddField(true)}>add</buton>  
    </div>
      <table className="w-full border">
      <thead>
          <tr className="bg-gray-200">
            <th className="p-4">ID</th>
            <th className="p-4">Name</th>
          <th className="p-4">
          Source
          </th>
            <th className="p-4">Modifier/supprimer</th>          
        </tr>
        </thead> 
      <tbody>
        { addField &&<tr>
        <th className="p-4"></th>
        <th className="p-4"><input type="text" value={ inputValue } onChange={handleNewName} placeholder="Saisir le nom" /></th>
          <th className="p-4"><input type="file" id="fileInput" onChange={ ( e ) => handleFileChange( e ) } name="fileInput" accept="image/jpeg, image/png" className="border border-gray-300 p-2"/></th>
          <th><button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded" onClick={ () => { sendMangaData(); uploadImage(); setAddField( false ); setInputValue( "" ); getMangaData() } }>add</button>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded ms-4" onClick={ () => {setAddField( false ); setInputValue( "" ) } }>X</button>
          </th>
          </tr>
        }
        { lines.map( (line ) =>
          <LineBackOffice changeFile={e=>handleFileChange(e) } id={ line[ 0 ] } name={ line[ 1 ] }  source={line[2]} key={ line[ 0 ] } Delete={ () => deleteLine( line ) } >
            <input onChange={ ( e ) => changeName( line,e ) } type="text" value={ line[ 1 ] } />
          </LineBackOffice>
)} 
        </tbody>
      </table>
    </>
  );
}
