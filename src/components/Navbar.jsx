import React from 'react';
import Image from 'next/image';
import logo from "/public/images/logo.png";
import GoldButton from './GoldButton';
import Link from 'next/link';
import { useAuth } from '@/middleware/auth'; // Assurez-vous que le chemin est correct
import Cookies from 'universal-cookie';
import { useEffect } from 'react';
const Navbar = ( { onClick } ) =>
{
  const { user,setUser, isCookie,setIsCookie } = useAuth(); // Utilisez le hook useAuth ici
  useEffect(() => {}, [isCookie,user]);

  const handleLogout = () => {
    const cookies = new Cookies(); // Créez une instance de Cookies
    const token = cookies.get("token");
    if (token) {
      console.log('The token:', token); // Log pour vérifier si le token est trouvé
      try {
        cookies.remove("token"); // Supprimez le cookie "token"
        setUser( null );
        setIsCookie( false );// Mettez à jour l'état local de l'utilisateur à null
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found');
    }
  };

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
        <div className="hidden md:block">
          <GoldButton url="/myspace" text="Mon Espace" />
          { isCookie ?
            <GoldButton url="/" text="Déconnexion" onClick={ handleLogout } /> :
            <><GoldButton url="/signin" text="Connexion" />
            <GoldButton url="/signup" text="Créer un compte" /></> }
          { user ?
            <GoldButton url="" text={ user.username} />:
            <></>}
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
