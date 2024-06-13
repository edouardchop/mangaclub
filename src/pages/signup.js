import { useState } from 'react';
import Navbar from "@/components/Navbar";
import VerticalBar from '@/components/VerticalBar';
import Formfield from '@/components/Formfield';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '@/middleware/auth'; // Assurez-vous que le chemin est correct

export default function Signup() {
    const router = useRouter();
  const {setIsCookie} = useAuth(); // Utilisez le hook useAuth ici
    const [showRightBar, setShowRightBar] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {  
            const response = await axios.post('http://localhost:3000/api/user', {
                firstname: formData.firstname,
                lastname: formData.lastname,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: "user"
            } );
            if ( response.data )
            {
                router.push( '/' ); // Rediriger vers la page d'accueil après une inscription réussie
                setIsCookie(true)
            } else {
                console.error('Erreur lors de l\'inscription:', response.data);
            }

        } catch (error) {
            console.error('Erreur inattendue lors de l\'inscription:', error);
        }
    }

    return (
        <>
            <Navbar onClick={() => setShowRightBar(!showRightBar)} />
            {showRightBar && <VerticalBar onClick={() => setShowRightBar(!showRightBar)} />}
            <div className="flex justify-center pt-32">
                <form onSubmit={handleSubmit} className="bg-white border-1 shadow-inner border-grey border-2 rounded px-8 pt-6 pb-8 mb-4">
                    <Formfield name="Firstname" information="firstname" value={formData.firstname} placeholder="firstname" onChange={handleChange} />
                    <Formfield name="Lastname" information="lastname" value={formData.lastname} placeholder="lastname" onChange={handleChange} />
                    <Formfield name="Username" information="username" value={formData.username} placeholder="username" onChange={handleChange} />
                    <Formfield name="Email" information="email" value={formData.email} placeholder="email" onChange={handleChange} />
                    <Formfield name="Password" information="password" value={formData.password} placeholder="password" onChange={handleChange} />
                    <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Sign Up
                        </button>
                    </div>
                    <Link href="/signin">Déjà un compte?</Link>
                </form>
            </div>
        </>
    );
}
