import { useState } from "react"
import axios from 'axios';
import LineBackOffice from "@/components/LineBackOffice"
import SourceImage from "@/components/SourceImage";
export const getServerSideProps = async ({ params }) => {

  const mangaResponse = await axios.get( " http://localhost:3000/api/manga/" )
  const { data: mangaData } = mangaResponse
  return ({
    props: {
    manga: mangaData.result,

    }
}
  )
}



export default function MangaCategory (props)
{

  const mangas = props.manga
const allManga=mangas.map(manga=>[manga.id,manga.name])
const [ lines, setLines ] = useState( allManga )
const [ incrementId, setIncrementId ] = useState( allManga.length + 1 )
const [addField,setAddField] = useState(false)
const [inputValue, setInputValue] = useState('');
const [selectedFile, setSelectedFile] = useState(null);
  const [ newText, setNewText ] = useState( "" )
  const [newName,setNewName]=useState("")
    const handleFileChange = ( event ) =>
    {
        console.log("change")
    const file = event.target.files[0];
        setSelectedFile( file )
        console.log(file)
  };

  
const uploadImage = () => {
    if ( selectedFile )
    {
      const reader = new FileReader();
        reader.onload = function ( event )
        {
            const content = event.target.result.split( ',' )[ 1 ];
            const bufParam = Buffer.from( content.replace( /^data:image\/\w+;base64,/, "" ), 'base64' )
          setNewName(newText.replace( /\s/g, "" ))
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
  const addOneLine = () =>
  {setAddField(true)
    setIncrementId(incrementId + 1 )
    const newLine = {
      id: incrementId,
      name: ""

    }

    const thisLine=[newLine.id,newLine.name]
    setLines( [ ...lines,thisLine ]);
    console.log( "voici la nouvelle ligne : ", thisLine )  
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
    console.log("handle nes name :",newText)
  }
  

  const sendMangaData = async () =>
  {

    console.log("newText :", newText)
    try
    {

      const mangaResponse = await axios.post( 'http://localhost:3000/api/manga/', {
        name:newText,
        source:newName,
        rate: 0
      } )
      const mangaData = mangaResponse.data.result
    
      return {
        props: {
          manga: mangaData
        }
      }
    } catch ( error )
    {
      console.error( 'Erreur lors de la récupération des données:', error )
      throw error
    }
  }
return (

    <>
        <div className="flex justify-center">
    <h1>BackOffice Manga</h1>
            <buton className="ps-64 " onClick={ addOneLine }>add</buton>  
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
        <th className="p-4"><SourceImage onChange={(e)=>handleFileChange(e) } onClick={uploadImage}/></th>
          <th><button className="bg-blue-500 text-white px-4 py-2"onClick={sendMangaData}>add</button></th>
          </tr>
        }
        { lines.map( (line ) =>
          <LineBackOffice changeFile={e=>handleFileChange(e) } uploadFile={ uploadImage} id={ line[ 0 ] } name={ line[ 1 ] } source={mangas.Source} key={ line[ 0 ] } Delete={ () => deleteLine( line ) } >
            <input onChange={ ( e ) => changeName( line,e ) } type="text" value={ line[ 1 ] } />
          </LineBackOffice>
)} 
        </tbody>
      </table>
    </>
  );
}
