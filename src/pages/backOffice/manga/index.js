import { useState } from "react"
import axios from 'axios';
import LineBackOffice from "@/components/LineBackOffice";
export const getServerSideProps = async ({ params }) => {

  const mangaResponse = await axios.get("../../../api/manga/index.js")

  const { data: mangaData } = mangaResponse


  return {
    props: {
      manga: mangaData.result,

    }
  }
}



export default function MangaCategory (props)
{
const mangas = props.manga
const allManga=mangas.map(manga=>[manga.id,manga.name])

const [ lines, setLines ] = useState( allManga )
  const [ incrementId, setIncrementId ] = useState( allManga.length + 1 )
  





  const addOneLine = () =>
  {
    setIncrementId(incrementId + 1 )
    const newLine = {
      id: incrementId,
      name: ""

    };
    const thisLine=[newLine.id,newLine.name]
    setLines( [ ...lines,thisLine ]);
console.log("voici la nouvelle ligne : ",thisLine )    
  }
  




  
    
  const deleteLine = ( line ) =>
  {
    const newLines = lines.filter( otherLine => otherLine[ 0]!= line[0] )
   setLines(newLines) 
  }
  
  const changeName = (line,e) =>
  {
    const otherLines = lines.filter( otherLine => otherLine[ 0 ] != line[ 0 ] )
    const newLine=[line[0],e.target.value]
    const transLines = [ ...otherLines, newLine ]
    const sortedLines = transLines.sort((a, b) => a[0] - b[0]);
    setLines( sortedLines )
    console.log( "la Ligne :", transLines )


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
        { lines.map( ( line ) =>
          <LineBackOffice id={ line[ 0 ] } name={ line[ 1 ] } key={ line[ 0 ] } onClick={ () => deleteLine( line ) } >
            <input onChange={ ( e ) => changeName( line,e ) } type="text" value={ line[ 1 ] } />
          </LineBackOffice>
)} 
        </tbody>
      </table>
    </>
  );
}
