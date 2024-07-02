import { useState } from 'react';
import Formfield from '@/components/Formfield';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '@/context/auth'; // Assurez-vous que le chemin est correct

export default function Signin() {
  const router = useRouter();
  const { setIsAuthenticated, setUser } = useAuth(); // Utilisez le hook useAuth ici
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        username: formData.username,
        password: formData.password
      });

      if (response.data) {
        setIsAuthenticated(true);
        setUser(response.data.user); // Mettre à jour les informations utilisateur
        router.push('/'); // Rediriger vers la page d'accueil après une connexion réussie
      } else {
        console.error('Erreur lors de la connexion:', response.data);
      }

    } catch (error) {
      console.error('Erreur inattendue lors de la connexion:', error);
    }
  };

  return (
    <>
      <div className="flex justify-center pt-32">
        <form onSubmit={handleSubmit} className="bg-white border-1 shadow-inner border-grey border-2 rounded px-8 pt-6 pb-8 mb-4">
          <Formfield name="Username" information="username" value={formData.username} placeholder="Username" onChange={handleChange} />
          <Formfield name="Password" information="password" value={formData.password} placeholder="**********" onChange={handleChange} />
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign In
            </button>
          </div>
          <Link href="/signup">Pas encore de compte?</Link>
        </form>
      </div>
    </>
  );
}
