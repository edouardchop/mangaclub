import { AwsService } from "@/api/db/ServiceAws";

export const getServerSideProps = async () =>
{
    try
    { 
    console.log("hello")
    const mangaResponse = await axios.get( `http://localhost:3000/api/manga/${ [ id ] }` )
    const { data: mangaData } = mangaResponse
    console.log (mangaResponse)
    const aws = new AwsService()
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
    const manga = props
    return(<>{manga.name}hello</>)
    
}