import Link from "next/link"
export default function GoldButton ( { text, url } )
{
    const redirection = () =>
    {
    }
    
    return (
        <Link href={ url } className=" py-4 px-2 font-bold mx-6" style={ { backgroundColor: '#D7C412' } }>{text}</Link>
    )

}