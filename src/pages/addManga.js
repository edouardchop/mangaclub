import { useState } from 'react';
import axios from 'axios';
import authenticateUser from '@/middlewares/user';
import { useRouter } from 'next/router';

export const getServerSideProps = authenticateUser( async ( { req } ) =>
{
    const token = req.headers.cookie
        .split( ';' )
        .find( c => c.trim().startsWith( 'token=' ) )
        ?.split( '=' )[ 1 ];

    try
    {

        const userResponse = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers: {
                Cookie: `token=${ token }`,
            },
        } );
        const userData = userResponse.data.user;

        return {
            props: {
                user: userData,
            }
        };
    } catch ( error )
    {
        console.error( 'Error fetching data:', error.message );
        return {
            props: {
                user: null,
            }
        };
    }
} );
const AddManga = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [newText, setNewText] = useState('');
  const [error, setError] = useState('');
  const user = props.user;
  const router = useRouter();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const uploadImage = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const content = event.target.result.split(',')[1];
        const bufParam = Buffer.from(content.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const params = {
          name: newText.replace(/\s/g, ''),
          type: selectedFile.type,
          buf: bufParam,
        };

        axios
          .post('../api/image/', params)
          .then((response) => {
          })
          .catch((error) => {
            console.error("Erreur lors de l'upload de l'image:", error);
          });
      };

      reader.readAsDataURL(selectedFile);
    } else {
    }
  };

  const sendMangaData = async () => {
    if (!inputValue.trim() || !selectedFile) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const mangaResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/manga/`, {
        name: inputValue,
        source: inputValue.replace(/\s/g, ''),
        rate: 0,
        userId: user.userId,
      });

      const newManga = mangaResponse.data.result;

      // Réinitialiser les champs après la soumission réussie
      setInputValue('');
      setSelectedFile(null);
      setError('');

      // Redirection vers "/"
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de la création du manga:', error);
    }
  };

  const handleNewName = (event) => {
    setInputValue(event.target.value);
    setNewText(event.target.value);
    setError('');
  };

  return (
    <form className="w-full max-w-lg mx-auto mt-8">
      <div className="flex items-center mb-4">
        <label htmlFor="name" className="mr-2 w-1/4 text-right">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={inputValue}
          onChange={(e) => handleNewName(e)}
          required
          className="border border-gray-300 p-2 w-3/4"
        />
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="image" className="mr-2 w-1/4 text-right">
          Image:
        </label>
        <input
          type="file"
          id="image"
          onChange={(e) => handleFileChange(e)}
          accept="image/jpeg, image/png"
          className="border border-gray-300 p-2 w-3/4"
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mb-4 mx-auto text-center">{error}</p>
      )}
      <div className="flex justify-center">
        <button
          className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
          onClick={(e) => {
            e.preventDefault();
            sendMangaData();
            uploadImage();
          }}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddManga;