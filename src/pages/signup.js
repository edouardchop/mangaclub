import { useState } from 'react';
import Formfield from '@/components/Formfield';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '@/context/auth'; // Assurez-vous que le chemin est correct

export default function Signup() {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [formErrors, setFormErrors] = useState({
    emailError: '',
    passwordError: '',
    signUpError: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      emailError: '',
      passwordError: '',
      signUpError: ''
    }));
  };

  const validateForm = () => {
    let valid = true;

    // Validation de l'e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.match(emailRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        emailError: 'Veuillez entrer une adresse e-mail valide.',
      }));
      valid = false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/;
    if (!formData.password.match(passwordRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: 'Le mot de passe doit contenir au moins 12 caractères, dont une majuscule, un chiffre et un caractère spécial.',
      }));
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        firstname: formData.firstname,
        lastname: formData.lastname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 'user',
      });

      if (response.data) {
        await handleLogin()
      } else {
        console.error('Erreur lors de l\'inscription:', response.data);
      }
    } catch (error) {
      console.error('Erreur inattendue lors de l\'inscription:', error);
      if (error.response && error.response.data && error.response.data.error === 'Email already exists') {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          signUpError: 'Cette adresse e-mail est déjà associée à un compte.',
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          signUpError: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer plus tard.',
        }));
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        username: formData.username,
        password: formData.password,
      });

      if (response.data) {
        setIsAuthenticated(true);
        router.push('/'); // Rediriger vers la page d'accueil après une connexion réussie
      } else {
        console.error( 'Erreur lors de la connexion:', response.data );
      }
    } catch (error) {
      console.error('Erreur inattendue lors de la connexion:', error);
    }
  };

  return (
    <>
      <div className="flex justify-center pt-32">
        <form onSubmit={handleSubmit} className="bg-white border-1 shadow-inner border-grey border-2 rounded px-8 pt-6 pb-8 mb-4">
          <Formfield name="Firstname" information="firstname" value={formData.firstname} placeholder="Firstname" onChange={handleChange} />
          <Formfield name="Lastname" information="lastname" value={formData.lastname} placeholder="Lastname" onChange={handleChange} />
          <Formfield name="Username" information="username" value={formData.username} placeholder="Username" onChange={handleChange} />
          <Formfield name="Email" information="email" value={formData.email} placeholder="Email" onChange={handleChange} />
          {formErrors.emailError && <p className="text-red-500 text-xs italic">{formErrors.emailError}</p>}
          {formErrors.passwordError && <p className="text-red-500 text-xs italic">{formErrors.passwordError}</p>}
          {formErrors.signUpError && <p className="text-red-500 text-xs italic">{formErrors.signUpError}</p>}
          <Formfield name="Password" information="password" value={formData.password} placeholder="Password" onChange={handleChange} />
          <p className="text-red-500 text-xs italic">Le mot de passe doit contenir au moins 12 caractères, dont une majuscule, un chiffre et un caractère spécial.</p>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign Up
            </button>
          </div>
          <Link href="/signin">Already have an account?</Link>
        </form>
      </div>
    </>
  );
}
