import { useState } from 'react';
import axios from 'axios';

const CreateMangaForm = ({ user, updateMangaList }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

 const sendMangaData = async () => {
    try {
      if (selectedFile) {
        const mangaResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/manga/`, {
          name: newText,
          source: newText.replace(/\s/g, ""),
          rate: 0,
          userId: user.userId
        });

        const newManga = mangaResponse.data.result;
        const newList = [...lines, [newManga.id, newManga.name, newManga.source]];
        setLines(newList);
      } else {
      }
    } catch (error) {
      console.error('Erreur lors de la création du manga:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8">
      <div className="flex items-center mb-4">
        <label htmlFor="name" className="mr-2 w-1/4 text-right">Name:</label>
        <input
          type="text"
          id="name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
          className="border border-gray-300 p-2 w-3/4"
        />
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="image" className="mr-2 w-1/4 text-right">Image:</label>
        <input
          type="file"
          id="image"
          onChange={sendMangaData}
          accept="image/jpeg, image/png"
          className="border border-gray-300 p-2 w-3/4"
        />
      </div>
      <div className="flex justify-center">
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded">Create Manga</button>
      </div>
    </form>
  );
};

export default CreateMangaForm;
