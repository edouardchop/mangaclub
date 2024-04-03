import { AwsService } from "@/api/db/ServiceAws";
import Navbar from "@/components/Navbar";
import axios from "axios"
import Image from "next/image";
import Rating from "@/components/Rating";
import Tag from "@/components/Tag"
import Filter from "@/components/Filter";
import { useState } from "react";

export const getServerSideProps = async ( req, res ) =>
{
    try
    { 
    const mangaResponse = await axios.get( `http://localhost:3000/api/manga/${ req.query.id }` )
    const { data: mangaData } = mangaResponse
    return {
        props: {
            manga: mangaData.result,
        }
    }
    }
catch ( error )
{
    console.log( "erreur : ", error )
    return {
        props: {
            manga: [],
        }
    }
}
    
}
export default function  manga(props)
{

    const [ add, setAdd ] = useState( false )
    const [minus,setMinus] = useState(false)
const manga = props.manga
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
                <Tag />
                <Tag />
                <Tag />
                <Tag />
                </div>
                <div className="flex justify-center">
                    <button className="m-4" onClick={ () => { setAdd( !add ); setMinus( false ) } }>add</button>
                    <button onClick={ () => { setMinus( !minus ); setAdd(false)} }>minus</button>
                    </div>
                    {add && <div className="flex justify-center"><Filter /> </div> }
                 { minus && <div className="flex justify-center"><Filter /> </div> }  
                <Rating />
        <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="border border-black mt-9"></div>

        </div>
    </div>    

</>
)
    
}
