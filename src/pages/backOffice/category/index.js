import { useState } from "react"
import axios from 'axios';
import LineBackOfficeCategory from "@/components/LineBackOfficeCategory"


export const getServerSideProps = async ({ params }) => {

  const categoryResponse = await axios.get( " http://localhost:3000/api/category/" )
  const { data: categoryData } = categoryResponse
  return ({
    props: {
    category: categoryData.result,

    }
}
  )
}



export default function Category (props)
{

  const categories = props.category
const allCategory=categories.map(category=>[category.id,category.name])
const [ lines, setLines ] = useState( allCategory )
const [ incrementId, setIncrementId ] = useState( allCategory.length + 1 )
const [addField,setAddField] = useState(false)
  const [ inputValue, setInputValue ] = useState( '' );
  const [ newText, setNewText ] = useState( "" )
  const [ newName, setNewName ] = useState( "" )
  
    const handleFileChange = ( event ) =>
    {
        console.log("change")
    const file = event.target.files[0];
        setSelectedFile( file )
        console.log(file)
  };

  
  const addCategory = () =>
  {setAddField(true)

  }
   
  const deleteLine = ( line ) =>
  {
    const newLines = lines.filter( otherLine => otherLine[ 0]!= line[0] )
   setLines(newLines) 
  }
  
  const handleNameInBox = async ( event ) =>
  {
    setInputValue( event.target.value )
    setNewText(event.target.value )
  }
  

  const sendCategoryData = async () =>
  {
    try
    {
      const categoryResponse = await axios.post( 'http://localhost:3000/api/category/', {
        name:newText,
      } )
      getCategoryData()
    } catch ( error )
    {
      console.error( 'Erreur lors de l envoi et recupération  des données:', error )
      throw error
    }
  }

    const getCategoryData = async () =>
  {
    try
    {

      const categoryResponse = await axios.get( 'http://localhost:3000/api/category/')
      const categoryData = categoryResponse.data.result
      const newCategories=categoryData.map(category=>[category.id,category.name])
setLines(newCategories)
    } catch ( error )
    {
      console.error( 'Erreur lors de la récupération des données:', error )
      throw error
    }
  }

return (

    <>
        <div className="flex justify-center">
    <h1>BackOffice Category</h1>
            <buton className="ps-64 " onClick={ addCategory }>add</buton>  
    </div>
      <table className="w-full border">
      <thead>
          <tr className="bg-gray-200">
            <th className="p-4">ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Modifier/supprimer</th>          
        </tr>
        </thead> 
      <tbody>
        { addField &&<tr>
        <th className="p-4"></th>
        <th className="p-4"><input type="text" value={ inputValue } onChange={handleNameInBox} placeholder="Saisir le nom" /></th>
          <th><button className="bg-blue-500 text-white px-4 py-2" onClick={ () => { sendCategoryData(); setAddField( false ); setInputValue( "" ); getCategoryData()} }>add</button></th>
          </tr>
        }
        {lines.map( (line ) =>
          <LineBackOfficeCategory  id={ line[ 0 ] } name={ line[ 1 ] } source={categories.Source} key={ line[ 0 ] } Delete={ () => deleteLine( line ) } >
            <input onChange={ ( e ) => changeName( line,e ) } type="text" value={ line[ 1 ] } />
          </LineBackOfficeCategory>
)} 
        </tbody>
      </table>
    </>
  );
}