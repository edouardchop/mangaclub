import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCookie, setIsCookie] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (token) {
      console.log('Token found:', token);
      console.log("l'état de setCookie", isCookie); // Log pour vérifier si le token est trouvé
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded user:', decoded); // Log pour vérifier si le décodage fonctionne
        setUser( decoded );
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found');
    }
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser, isCookie, setIsCookie}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
