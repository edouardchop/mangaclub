import Link from "next/link"
import { FaWindowClose } from "react-icons/fa"
import logo from "/public/images/logo.png"
import Image from 'next/image'



export default function VerticalBar ({onClick,children}) {
  return (


      <aside className="flex-col w-full md:w-80 fixed right-0 top-0 h-screen" style={ { backgroundColor: '#D7C412' } }>
  
        <div className="flex">
        <Image
    src={logo}
    width={250}
    alt="Picture of the author"
        />
        <button onClick={ onClick } className="pb-7 md:ps-4 ps-12 pt-3">
          <FaWindowClose size={ 70 }/></button>
      </div>
      <div className="flex flex-col">
          <Link href="/favoris"className="border-2 p-7 text-center">Vos favoris</Link>
          <Link href="/signin"className="border-2 p-7 text-center">Inscription</Link>
        <Link href="/signup" className="border-2 p-7 text-center">Connexion</Link>
        </div>
      </aside>



  )
}

