import React from 'react';
import Image from 'next/image';
import logo from "/public/images/logo.png";
import GoldButton from './GoldButton';
import Link from 'next/link';
import { useAuth } from '@/context/auth'; // Assurez-vous que le chemin est correct
import { useState } from 'react';
import VerticalBar from './VerticalBar';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth(); // Utilisez le hook useAuth ici
  const [verticalBar, setVerticalBar] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout(); // Appel à la fonction de déconnexion du contexte
      router.push('/'); // Redirigez l'utilisateur après la déconnexion
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <nav className="border-b-4 shadow-md shadow-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between">
          <Link href="/">
            <Image
              src={logo}
              width={250}
              alt="Logo"
            />
          </Link>
          <div className="hidden md:block">
            {isAuthenticated ? (
              <>
                <GoldButton url="/mySpace" text="Mon Espace" />
                <GoldButton url="/" text="Déconnexion" onClick={ handleLogout } />
                <GoldButton url="/addManga" text="Ajouter un manga" />
              </>
            ) : (
              <>
                <GoldButton url="/signin" text="Connexion" />
                <GoldButton url="/signup" text="Créer un compte" />
              </>
            )}
          </div>
          <button className="space-y-2 me-3" onClick={() => setVerticalBar(!verticalBar)}>
            <div className="w-8 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-0.5 bg-gray-600"></div>
          </button>
        </div>
      </nav>

      {verticalBar && <VerticalBar onClick={() => setVerticalBar(!verticalBar)} user={user} isAuthenticated={isAuthenticated} />}
    </>
  );
};

export default Navbar;
