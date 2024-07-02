import axios from "axios";
import Image from "next/image";
import Rating from "@/components/Rating";
import Tag from "@/components/Tag";
import Filter from "@/components/Filter";
import { useState,useEffect } from "react";
import { useRouter } from 'next/router';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export const getServerSideProps = async ({ req, query }) => {
  let user = null;

  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = { userId: decoded.userId, role: decoded.role };
    } catch (error) {
      console.error('Invalid token', error);
    }
  }

  try {
    const mangaResponse = await axios.get(`http://localhost:3000/api/manga/${query.id}`);
    const { data: mangaData } = mangaResponse;

    const categoryResponse = await axios.get(`http://localhost:3000/api/mangaCategories/mangaToCategory/${query.id}`);
    const { data: categoryData } = categoryResponse;

    const allCategoryResponse = await axios.get(`http://localhost:3000/api/category`);
    const { data: allCategoryData } = allCategoryResponse;

    return {
      props: {
        manga: mangaData.result,
        category: categoryData,
        allCategory: allCategoryData.result,
        user,
      }
    };
  } catch (error) {
    return {
      props: {
        manga: [],
        category: [],
        allCategory: [],
        user: null,
      }
    };
  }
}

export default function Manga ( props )
{

  const router = useRouter();
  const { manga, category, allCategory, user } = props;
  const [add, setAdd] = useState(false);
  const [minus, setMinus] = useState(false);
  const [nameCategory, setNameCategory] = useState(null);
  const [allName, setAllName] = useState(category);
  const [description, setDescription] = useState(false);
const [ editedDescription, setEditedDescription ] = useState( manga.description ); // State to hold edited description
    

  const showAdd = () => {
    setAdd(!add);
    setMinus(false);
  }

  const showMinus = () => {
    setMinus(!minus);
    setAdd(false);
  }

  const getCategorySelected = (e) => {
    setNameCategory(e.target.value);
  }

  const addCategory = async () => {
    try {
      const newCategory = await axios.post("http://localhost:3000/api/mangaCategories/", {
        mangaId: router.query.id,
        categoryId: nameCategory
      });
      const getCategory = await axios.get(`http://localhost:3000/api/mangaCategories/mangaToCategory/${router.query.id}`);
      const categoryResponse = getCategory.data;
      setAllName(categoryResponse);
      setAdd(false);
      setMinus(false);
    } catch (error) {
    }
  }

  const deleteCategory = async () => {
    try {
      const mangaId = router.query.id;
      const response = await axios.delete(`http://localhost:3000/api/mangaCategories/mangaToCategory/${mangaId}`, {
        data: { categoryId: nameCategory }
      });
      const getCategory = await axios.get(`http://localhost:3000/api/mangaCategories/mangaToCategory/${mangaId}`);
      const categoryResponse = getCategory.data;
      setAllName(categoryResponse);
      setAdd(false);
      setMinus(false);
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);
    }
  }

  const saveDescription = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/manga/${router.query.id}`, {
          description: editedDescription // Use editedDescription instead of manga.description
      } );
          setEditedDescription(editedDescription)
    } catch (error) {
      console.error("Error updating description:", error);
    }
  }

  return (
    <>
      <div className="flex ms-7 mt-8">
        <div className="">
          <Image
            alt="Image of Manga"
            src={`https://mangaclubimage.s3.eu-north-1.amazonaws.com/${manga.source}`}
            width={250}
            height={120}
          />
        </div>
        <div className="text-center mx-auto">
          <h1 className="text-4xl font-bold mb-8">{manga.name}</h1>
          <div className="flex justify-center">
            {allName.map(element => <Tag key={element.name} onClick={() => {}} tag={element.name} />)}
          </div>
          {user && (user.role === "admin" || user.userId === manga.userId) && (
            <div className="flex justify-center">
              <button className="m-4 text-4xl" onClick={showAdd}>+</button>
              <button onClick={showMinus} className="mb-1 text-5xl">-</button>
            </div>
          )}
          {add && (
            <div className="flex justify-center">
              <Filter onChange={getCategorySelected} categories={allCategory} />
              <button onClick={addCategory} className="w-24 bg-yellow-500">Add</button>
            </div>
          )}
          {minus && (
            <div className="flex justify-center">
              <Filter onChange={getCategorySelected} categories={allCategory} />
              <button onClick={deleteCategory} className="w-24 bg-yellow-500">Delete</button>
            </div>
          )}
          <Rating />
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <div>{editedDescription}</div>
          {user && (user.role === "admin" || user.userId === manga.userId) && (
            <button className="ml-4 bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => setDescription(true)}>Edit Description</button>
          )}
          {description && (
            <>
              <textarea
                className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)} // Update editedDescription on change
              />
              <button
                className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => { saveDescription(); setDescription(false); }}
              >
                Save
              </button>
            </>
          )}
          <div className="border border-black mt-9"></div>
        </div>
      </div>
    </>
  );
}
