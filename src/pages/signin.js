import { useState } from 'react'
import Navbar from "@/components/Navbar"
import VerticalBar from '@/components/VerticalBar'
import Formfield from '@/components/Formfield'
import CheckPassword from '@/components/checkPassword'
import Link from 'next/link'
export default function Signin ()
{
    
    const [ showRightBar, setShowRightBar ] = useState( false )
    const [ show, setShow]= useState(true)
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici votre logique de connexion
    };

    return (
        <>
      <Navbar onClick={ () => setShowRightBar( !showRightBar ) } /> 
            { showRightBar && <VerticalBar onClick={ () => setShowRightBar( !showRightBar ) } /> }
            <div className=" flex justify-center pt-32 ">
                <form onSubmit={handleSubmit} className="bg-white border-1 shadow-inner border-grey border-2 rounded px-8 pt-6 pb-8 mb-4">
                    <Formfield name="Username" information="username" value={formData.username} placeholder="Username" onChange={handleChange}/>
                    <Formfield name="password" information="password" value={ formData.password } placeholder="**********" onChange={ handleChange } />
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
