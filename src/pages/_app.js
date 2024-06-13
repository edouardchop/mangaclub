// pages/_app.js
import React from 'react';
import '@/styles/globals.css'
import { AuthProvider } from '@/middleware/auth';
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component { ...pageProps } />
    </AuthProvider>

      

  );
}
