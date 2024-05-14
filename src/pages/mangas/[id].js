import Navbar from "@/components/Navbar";
import axios from "axios"
import Image from "next/image";
import Rating from "@/components/Rating";
import Tag from "@/components/Tag"
import Filter from "@/components/Filter";
import { useState } from "react";
import { useRouter } from 'next/router'

export const getServerSideProps = async ( req, res ) =>
{
    try
    { 
    const mangaResponse = await axios.get( `http://localhost:3000/api/manga/${ req.query.id }` )
    const { data: mangaData } = mangaResponse
        
    const categoryResponse = await axios.get( `http://localhost:3000/api/mangaCategories/mangaToCategory/${ req.query.id }` )
    const { data: categoryData } = categoryResponse
    const allCategoryResponse=await axios.get( `http://localhost:3000/api/category` )
    const {data: allCategoryData}=allCategoryResponse
    return {
        props: {
            manga: mangaData.result,
            category: categoryData,
            allCategory:allCategoryData.result
        }
    }
    }
catch ( error )
{
    console.log( "erreur : ", error )
    return {
        props: {
            manga: [],
            category: [],
            allCategory:[]
            
        }
    }
}
    
}
export default function  manga(props)
{
    const router = useRouter()
    const manga = props.manga
    const category = props.category
    const allCategory = props.allCategory
    const [ add, setAdd ] = useState( false )
    const [ minus, setMinus ] = useState( false )
    const [ nameCategory, setNameCategory ] = useState( null )
    const [allName,setAllName] = useState( category )
    
    const getAllCategory = async () =>
    {
        setAdd( !add )
        setMinus( false ) 
    }

    const getCategorySelected =  (e) =>
    {console.log("ici")
        setNameCategory(e.target.value)
        console.log("le nom : ",nameCategory)
    }
    
    const redirectManga = async () =>{
    
    }
    const addCategory = async ( req, res ) =>
    {
        try
        {
            const newCategory = await axios.post( "http://localhost:3000/api/mangaCategories/", {
                mangaId: router.query.id,
                categoryId: nameCategory
            } )
            const getCategory = await axios.get( `http://localhost:3000/api/mangaCategories/mangaToCategory/${router.query.id}` )
            const categoryResponse = getCategory.data
            console.log("lalalal",categoryResponse)
            setAllName( categoryResponse )
        setAdd( false )
        setMinus( false ) 
        }
        catch ( error )
        {
            console.log("erreur : ",error)
        }
    }

    return ( <>
    <Navbar/>
 <div className="flex ms-7 mt-4">
      <div className="">
        <Image
        alt="Image of Manga"
        src={ `https://mangaclubimage.s3.eu-north-1.amazonaws.com/${manga.source}` }
        width={250}
        height={120}        
                />
                </div>
                <div className="text-center ms-16">
                <h1 className="text-4xl font-bold mb-8">{ manga.name }</h1>
                <div className="flex justify-center">
                </div>
                <div className="flex justify-center">
                    { allName.map( element =><Tag key={ element.name } onClick={ redirectManga } tag={ element.name }/>) }
                </div>
                <div className="flex justify-center">
                    <button className="m-4" onClick={ getAllCategory }>+</button>
                    <button onClick={getAllCategory}>-</button>
                    </div>
                { add && <div className="flex justify-center"><div className="flex justify-center"><Filter onChange={(e)=>getCategorySelected(e)} categories={ allCategory } /> </div>
                    <button onClick={ addCategory } className="ps-4">add</button></div>}
                { minus && <div className="flex justify-center"><Filter onChange={(e)=>getCategorySelected(e)} categories={allCategory} /> </div> }  
                <Rating />
        <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="border border-black mt-9"></div>

        </div>
    </div>    

</>
)
    
}