// pages/_app.js
import React from 'react';
import '@/styles/globals.css'
import { AuthProvider } from '@/context/auth';
import Navbar from '@/components/Navbar';

export default function App({ Component, pageProps }) {
  return (
  <UserProvider>
    <AuthProvider>
        <Navbar/>
        <Component { ...pageProps } />
    </AuthProvider>
  </UserProvider>


      

  );
}
