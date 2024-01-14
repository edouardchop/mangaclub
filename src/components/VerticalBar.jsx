import React, { useState } from 'react'
import { FaWindowClose } from "react-icons/fa"
import logo from "/public/images/logo.png"
import Image from 'next/image'



export default function VerticalBar ({onClick,children}) {
const [HideFilter,setHideFilter]=useState(false)
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
          <div>
            {HideFilter&&<div><button className="border-2 p-7 w-full" onClick={()=>setHideFilter(!HideFilter)}>
              hide filter
            </button>
            {children}
          </div>}</div>
          { !HideFilter && <button className="border-2 p-7 w-full" onClick={ () => setHideFilter( !HideFilter ) }>Show Filter</button> }
          <div className="border-2 p-7 text-center">Vos favoris</div>
          <div className="border-2 p-7 text-center">Inscription</div>
          <div className="border-2 p-7 text-center">Connexion</div>
      </aside>



  )
}

