import Link from "next/link"
export default function GoldButton ( { text, url, onClick } )
{

    return (
        <Link href={ url } onClick={onClick} className="mx-6 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded">{ text }</Link>
    )

}