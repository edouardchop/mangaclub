import { useState } from "react"


export const getServerSideProps = async ({ params }) => {

  const mangaResponse = await axios.get("http://localhost:3000/api/manga")

  const { data: mangaData } = mangaResponse


  return {
    props: {
      manga: mangaData.result,

    }
  }
}


export default function MangaCategory (props)
{


    const firstLine={
      id:1,
      name:"new Name",
      source:"new Source"
    }
const [lines,setLines]=useState([firstLine])

const addOneLine = () =>
{
 const newLine = {
      id: lines.length + 1,
      name:"new Name",
      source:"new Source"
    };
setLines([...lines, newLine]);
console.log( lines )    
    }
    
const deleteLine = ( e ) =>
{
    console.log(e)
const thisId = e.id
console.log( thisId )
const newLines = lines.filter( line => line.id != e.id )
   setLines(newLines) 
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
            <th className="p-4">Source</th>
            <th className="p-4">Modifier/supprimer</th>          
        </tr>
        </thead> 
        <tbody>
        {lines.map(line=>
          <tr className="border-b text-center">
            <td className="p-4">1</td>
            <td className="p-4">Example Name 1</td>
            <td className="p-4">Example Source 1</td>
            <td className="p-4">
            <button className="bg-green-500 text-white px-4 py-2 mr-2">Modifier</button>
            <button className="bg-red-500 text-white px-4 py-2" onClick={()=> deleteLine(line) }>Supprimer</button>
            </td>
          </tr>)} 
        </tbody>
      </table>
    </>
  );
}
