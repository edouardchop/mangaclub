// pages/backOffice/category.js
import { useState, useEffect } from "react";
import axios from 'axios';
import LineBackOfficeCategory from "@/components/LineBackOfficeCategory";
import authenticateAdmin from '@/middlewares/admin';

export const getServerSideProps = authenticateAdmin(async ({ params }) => {
  const categoryResponse = await axios.get("http://localhost:3000/api/category/");
  const { data: categoryData } = categoryResponse;

  return {
    props: {
      category: categoryData.result,
    }
  };
});

export default function Category(props) {
  const categories = props.category;
  const allCategory = categories.map(category => [category.id, category.name]);
  const [lines, setLines] = useState(allCategory);
  const [addField, setAddField] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [newText, setNewText] = useState('');
  const [showRightBar, setShowRightBar] = useState(false);

  useEffect(() => { getCategoryData() }, [addField]);

  const deleteLine = async (line) => {
    const newLines = lines.filter(otherLine => otherLine[0] != line[0]);
    setLines(newLines);
    const deleteLineData = await axios.delete(`http://localhost:3000/api/category/${line[0]}`);
    const responseDelete = deleteLineData;
  }

  const handleNameInBox = (event) => {
    setInputValue(event.target.value);
    setNewText(event.target.value);
  }

  const sendCategoryData = async () => {
    try {
      const categoryResponse = await axios.post('http://localhost:3000/api/category/', {
        name: newText,
      });
      getCategoryData();
    } catch (error) {
      console.error('Erreur lors de l envoi et recupération des données:', error);
      throw error;
    }
  }

  const getCategoryData = async () => {
    try {
      const categoryResponse = await axios.get('http://localhost:3000/api/category/');
      const categoryData = categoryResponse.data.result;
      const newCategories = categoryData.map(category => [category.id, category.name]);
      setLines(newCategories);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error;
    }
  }

  const changeName = async (line, e) => {
    const otherLines = lines.filter(otherLine => otherLine[0] != line[0]);
    const newLine = [line[0], e.target.value];
    setNewText(e.target.value);

    const transLines = [...otherLines, newLine];
    const sortedLines = transLines.sort((a, b) => a[0] - b[0]);
    setLines(sortedLines);
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl pt-8">BackOffice Category</h1>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded mt-12 mb-8" onClick={() => setAddField(!addField)}>add</button>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4">ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Modifier/supprimer</th>
          </tr>
        </thead>
        <tbody>
          {addField && <tr>
            <th className="p-4"></th>
            <th className="p-4"><input type="text" value={inputValue} onChange={handleNameInBox} placeholder="Saisir le nom" /></th>
            <th>
              <div className="flex justify-center">
                <button className="bg-blue-500 text-white px-4 py-2" onClick={() => { sendCategoryData(); setAddField(!addField); setInputValue("") }}>add</button>
                <button className="bg-red-500 text-white px-4 py-2 ms-4" onClick={() => { setAddField(!addField); setInputValue("") }}>X</button>
              </div>
            </th>
          </tr>}
          {lines.map((line) =>
            <LineBackOfficeCategory id={line[0]} name={line[1]} key={line[0]} Delete={() => deleteLine(line)}>
              <input onChange={(e) => changeName(line, e)} type="text" value={line[1]} />
            </LineBackOfficeCategory>
          )}
        </tbody>
      </table>
    </>
  );
}
