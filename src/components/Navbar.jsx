// Navbar.jsx
import React from 'react'
import Image from 'next/image'
import logo from "/public/images/logo.png"
import GoldButton from './GoldButton'
import Link from 'next/link'

const Navbar = ({onClick}) =>
{

  return (
 

<nav className="border-b-4 shadow-md shadow-black">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between">
        <Link href="/">
    <Image
    src={logo}
    width={250}
    alt="Picture of the author"
          />
          </Link>
        <div className="ms-72 hidden md:block">
        <GoldButton url="/myspace" text="Mon Espace"/>
        <GoldButton url="creation" text="Creation"/>
          <GoldButton url="creeruncompte" text="Créer un compte" />
        </div>
    <button className="space-y-2 me-3" onClick={onClick}>
      <div className="w-8 h-0.5 bg-gray-600"></div>
      <div className="w-8 h-0.5 bg-gray-600"></div>
      <div className="w-8 h-0.5 bg-gray-600"></div>
    </button>
      </div>
      
</nav>

  );
};

export default Navbar;
