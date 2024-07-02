import axios from "axios";


export const getCategory=async()=>{
      try
      {
        const categoryResponse = await axios.get( `http://localhost:3000/api/category/${categoryValue[0].id}` );
        const newData = categoryResponse
        setFilteredMangaData( newData.data )
      }
      catch(error){console.log("il y a eu une erreur lors de la récupération de la catégorie :",error)}
    }



