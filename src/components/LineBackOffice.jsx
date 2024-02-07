import { useState } from "react"
import axios from "axios"



export default function LineBackOffice ({id,name,onClick,children})
{

    const [ modify, setModify ] = useState( false )
    const [ text, setText ] = useState( { name } )
    const [selectedFile, setSelectedFile] = useState(null);

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
        console.log( selectedFile.type )
        
        let nameParam = selectedFile.name
        let typeImage = selectedFile.type
      const reader = new FileReader();
        reader.onload = function ( event )
        {
            const content = event.target.result.split( ',' )[ 1 ];
            const bufParam = Buffer.from( content.replace( /^data:image\/\w+;base64,/, "" ), 'base64' )
            
            const params = {
                name:selectedFile.name,
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
    } else { console.log("pas de fichier")}
  }
  const uploadManga = async () => {
    const postData = {
      name: req.params.name,
      image:{
                name:selectedFile.name,
                type:selectedFile.type,
                buf:bufParam
            }
    }
    try {
      const response = await axios.post("http://localhost:3000/api/manga/", postData);
      console.log('Réponse de la requête POST :', response.data);
    } catch (error) {
      console.error('Erreur lors de la requête POST :', error);
    }
  }
  
    return (
        <>
            { !modify &&
            <tr key={id} className="border-b text-center">
            <td className="p-4">{ id }</td>
            <td className="p-4">{ name}</td>
            <td className="p-4">source</td>
            <td className="p-4">
            <button className="bg-green-500 text-white px-4 py-2 mr-2" onClick={()=>setModify(!modify)}>Modifier</button>
            <button className="bg-red-500 text-white px-4 py-2" onClick={onClick}>Supprimer</button>
            </td>
          </tr>
            }
            { modify &&
                <tr key={id} className="border-b text-center">
            <td className="p-4">{ id }</td>
                    <td className="p-4">{ children }</td>
                    <td className="ps-32 w-48">
                <div className=" p-4 rounded shadow-md flex items-center h-10">
                            <input type="file" id="fileInput" onChange={ handleFileChange } name="fileInput" accept="image/jpeg, image/png" className="border border-gray-300 p-2"/>
                    <button type="submit" onClick={uploadImage} className="bg-blue-500 text-white px-2 py-1 rounded ml-2">Envoyer</button>
                    
                            
                 </div>
                    </td>
            <td className="p-4">
              <button className="bg-green-500 text-white px-4 py-2 mr-2" onClick={ () => { setModify( !modify ),uploadManga() } }>Modifier</button>
            <button className="bg-red-500 text-white px-4 py-2" onClick={onClick}>Supprimer</button>
            </td>
          </tr>
            }
        </>
    )
}