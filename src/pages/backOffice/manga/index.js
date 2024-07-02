import { useState, useEffect } from "react";
import axios from 'axios';
import LineBackOffice from "@/components/LineBackOffice";
import authenticateAdmin from '@/middlewares/admin';

export const getServerSideProps = authenticateAdmin(async ({ req }) => {
  const token = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('token='))
    ?.split('=')[1];

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const categoryResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);
    const { data: categoryData } = categoryResponse;

    const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    const userData = userResponse.data.user;

    const mangaResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/manga?userId=${userData.userId}`);
    const { data: mangaData } = mangaResponse;

    return {
      props: {
        mangas: mangaData.result,
        user: userData,
        category: categoryData.result,
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        mangas: [],
        user: null,
        category: [],
      }
    };
  }
});

export default function Manga(props) {
  const { mangas, user, category } = props;
  const allManga = mangas.map(manga => [manga.id, manga.name, manga.source]);
  const [lines, setLines] = useState(allManga);
  const [addField, setAddField] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [newText, setNewText] = useState('');

  useEffect(() => {
    getMangaData();
  }, [addField]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const uploadImage = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const content = event.target.result.split(',')[1];
        const bufParam = Buffer.from(content.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const params = {
          name: newText.replace(/\s/g, ""),
          type: selectedFile.type,
          buf: bufParam
        };

        axios.post("../api/image/", params)
          .then(response => {
          })
          .catch(error => {
            console.error('Erreur lors de l\'upload de l\'image:', error);
          });
      };

      reader.readAsDataURL(selectedFile);
    } else {
    }
  };

  const deleteLine = async (line) => {
    try {
      await axios.delete(`http://localhost:3000/api/manga/${line[0]}`);
      const newLines = lines.filter(otherLine => otherLine[0] !== line[0]);
      setLines(newLines);
    } catch (error) {
      console.error('Erreur lors de la suppression du manga:', error);
    }
  };

  const changeName = (line, e) => {
    const otherLines = lines.filter(otherLine => otherLine[0] !== line[0]);
    const newLine = [line[0], e.target.value, line[2]];
    setNewText(e.target.value);

    const transLines = [...otherLines, newLine];
    const sortedLines = transLines.sort((a, b) => a[0] - b[0]);
    setLines(sortedLines);
  };

  const handleNewName = (event) => {
    setInputValue(event.target.value);
    setNewText(event.target.value);
  };

  const sendMangaData = async () => {
    try {
      if (selectedFile) {
        const mangaResponse = await axios.post('http://localhost:3000/api/manga/', {
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

  const getMangaData = async () => {
    try {
      const mangaResponse = await axios.get('http://localhost:3000/api/manga');
      const mangaData = mangaResponse.data.result;
      const newMangas = mangaData.map(manga => [manga.id, manga.name, manga.source]);
      setLines(newMangas);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl pt-8">BackOffice Manga</h1>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded mt-12 mb-8" onClick={() => setAddField(!addField)}>add</button>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4">ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Source</th>
            <th className="p-4">Modifier/supprimer</th>
          </tr>
        </thead>
        <tbody>
          {addField && <tr>
            <th className="p-4"></th>
            <th className="p-4"><input type="text" value={inputValue} onChange={handleNewName} placeholder="Saisir le nom" /></th>
            <th className="p-4"><input type="file" id="fileInput" onChange={handleFileChange} name="fileInput" accept="image/jpeg, image/png" className="border border-gray-300 p-2" /></th>
            <th>
              <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded" onClick={() => { sendMangaData(); uploadImage(); setAddField(!addField); setInputValue(""); getMangaData() }}>add</button>
              <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded ms-4" onClick={() => { setAddField(!addField); setInputValue("") }}>X</button>
            </th>
          </tr>}
          {lines.map((line) =>
            <LineBackOffice changeFile={handleFileChange} id={line[0]} name={line[1]} source={line[2]} key={line[0]} Delete={() => deleteLine(line)}>
              <input onChange={(e) => changeName(line, e)} type="text" value={line[1]} />
            </LineBackOffice>
          )}
        </tbody>
      </table>
    </>
  );
}
