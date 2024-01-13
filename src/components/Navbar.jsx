// Navbar.jsx
import React from 'react'
import Image from 'next/image'
import logo from "/public/images/logo.png"
import {useState} from "react";

const Navbar = ({onFilter,onSearch,tag2,tag3}) =>
{

  const [ Search, setSearch ] = useState( false )
  const [textSearch,setTextSearch]=useState()


  const showSearch = () =>
  {
    setSearch( true ) 
  }

    const handleInputChange = (e) => {
    const value = e.target.value;
      setTextSearch( value );
      console.log("voici la value : ",textSearch)
  }
  return (
 

<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
    <Image
    src={logo}
    width={250}
    alt="Picture of the author"
    />
  <div className="flex md:order-2">
          <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden">
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" >
        <path stroke="currentColor"  strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      <span className="sr-only">Search</span>
    </button>
    <div className="relative hidden md:block">
      <div className="absolute inset-y-0 flex items-center ps-3">
        <svg className="w-4 h-4 text-blue-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
            <input onClick={ showSearch } onChange={handleInputChange} onKeyDown={ ( e ) => { if ( e.key == "Enter" ) { onSearch( e ); setSearch(!Search)} } } type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border" placeholder="Search..."/>
          </div>
          { Search && <button onClick={()=>onFilter( textSearch )}>Search</button> }
    <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden" aria-controls="navbar-search" aria-expanded="false">
        <svg className="w-5 h-5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border   bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
        </li>
        <li>
          <a className="hidden md:inline md:text-gray-900 p-0">{ tag2 }</a>
        </li>
        <li>
          <a className="hidden md:inline md:text-gray-900 p-0">{ tag3 }</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
