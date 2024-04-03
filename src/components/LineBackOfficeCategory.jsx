import { useState } from "react"
export default function LineBackOfficeCategory ({id,name,Delete,children})
{

  const [ modify, setModify ] = useState( false )
  
  
    return (
        <>
            { !modify &&
            <tr key={id} className="border-b text-center">
            <td className="p-4">{ id }</td>
            <td className="p-4">{ name}</td>
            <td className="p-4">
    <button className="bg-green-500 text-white px-4 py-2 mr-2" onClick={ () => setModify( !modify ) }>Modifier</button>
    <button className="bg-red-500 text-white px-4 py-2" onClick={Delete}>Supprimer</button>
            </td>
          </tr>
            }
            { modify &&
                <tr key={id} className="border-b text-center">
                <td className="p-4">{ id }</td>
                <td className="p-4">{ children }</td>
            <td className="p-4">
    <button className="bg-blue-500 text-white px-4 py-2 mr-2" onClick={ () => setModify( !modify ) }>Sauvegarder</button>
    <button className="bg-red-500 text-white px-4 py-2" onClick={Delete}>Supprimer</button>
            </td>
          </tr>
            }
        </>
    )
}