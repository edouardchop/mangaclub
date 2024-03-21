import { useState } from "react"
import ModifyDelete from "./ModifyDelete"
import SourceImage from "./SourceImage"
export default function LineBackOffice ({id,name,Delete,changeFile,uploadFile,children,source})
{

  const [ modify, setModify ] = useState( false )
  
  
    return (
        <>
            { !modify &&
            <tr key={id} className="border-b text-center">
            <td className="p-4">{ id }</td>
            <td className="p-4">{ name}</td>
            <td className="p-4">{source}</td>
            <td className="p-4">
              <ModifyDelete Modify={ () => setModify( !modify ) } Delete={ Delete } />
            </td>
          </tr>
            }
            { modify &&
                <tr key={id} className="border-b text-center">
                <td className="p-4">{ id }</td>
                <td className="p-4">{ children }</td>
                <td className="ps-32 w-48">
              <SourceImage onChange={ changeFile } onClick={uploadFile}/>
                </td>
            <td className="p-4">
              <ModifyDelete Modify={ () => setModify( !modify ) } Delete={ Delete } />
            </td>
          </tr>
            }
        </>
    )
}