import axios from "axios";
import Navbar from "../components/Navbar";
import OneManga from "@/components/OneManga";
import { useState } from "react";
import Tag from "@/components/Tag";
import Filter from "@/components/Filter";
import Search from "@/components/Search";
import getTag from "@/api/function/getTag.js";
import { useRouter } from "next/router";

export const getServerSideProps = async () => {
  try {
    const categoryResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);
    const { data: categoryData } = categoryResponse;

    const mangaResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/manga`);
    const { result: mangaList } = mangaResponse.data;

    const categoryMangaResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mangaCategories/categoryToManga`);
    const { data: categoryManga } = categoryMangaResponse;


    return {
      props: {
        category: categoryData.result,
        manga: mangaList,
        categoryManga: categoryManga.result,
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        category: [],
        manga: [],
        categoryManga: [],
      }
    };
  }
};

export default function Home(props) {
  const router = useRouter();
  const { category, manga, categoryManga } = props;
  const [filteredMangaData, setFilteredMangaData] = useState(manga);
  const [NoManga, setNoManga] = useState(false);
  const [textSearch, setTextSearch] = useState("");


  const handleSearchPartial = async (e) => {
    setNoManga(false);
    const categoryValue = category.filter(item => item.name.toLowerCase() === e.target.value.toLowerCase());
    if (categoryValue.length !== 0) {
      try {
        const categoryResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mangaCategories/categoryToManga/${categoryValue[0].id}`);
        const newData = categoryResponse.data;
        setFilteredMangaData(newData);
      } catch (error) {
        console.error("il y a eu une erreur lors de la récupération de la catégorie :", error);
      }
    }
    if (categoryValue.length === 0) {
      setNoManga(true);
    }
  };

  const handleSearch = async (text) => {
    setNoManga(false);
    if (text.length !== 0) {
      const categoryValue = category.filter(item => item.name.toLowerCase() === text.toLowerCase());
      if (categoryValue.length !== 0) {
        try {
          const categoryResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mangaCategories/categoryToManga/${categoryValue[0].id}`);
          const newData = categoryResponse.data;
          setFilteredMangaData(newData);
        } catch (error) {
          console.error("il y a eu une erreur lors de la récupération de la catégorie :", error);
        }
      }
      if (categoryValue.length === 0) {
        setNoManga(true);
      }
    }
  };

  const handleTag = async (element) => {
    const categorySearch = category.filter(item => item.name.toLowerCase() === element.toLowerCase());
    if (categorySearch.length !== 0) {
      try {
        const categoryResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mangaCategories/categoryToManga/${categorySearch[0].id}`);
        const newData = categoryResponse.data;
        setFilteredMangaData(newData);
        setNoManga(false);
      } catch (error) {
        console.error("il y a eu une erreur lors de la récupération de la catégorie :", error);
      }
    }
    if (categorySearch.length === 0) {
      setNoManga(true);
    }
  };

  const filterAllManga = () => {
    setFilteredMangaData(manga);
    setTextSearch("Tout les mangas");
    setNoManga(false);
  };

  const handleSearchFilter = async (e) => {
    setNoManga(false);
    const idValue = e.target.value;

    try {
      const categoryResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mangaCategories/categoryToManga/${idValue}`);
      const newData = categoryResponse.data;
      setFilteredMangaData(newData);
      if (newData.length === 0) {
        setNoManga(true);
      }
    } catch (error) {
      console.error("il y a eu une erreur lors de la récupération de la catégorie :", error);
    }
  };

  return (
    <div>
      <h1 className="py-10 text-4xl font-bold text-black text-center">{textSearch === 0 ? "Tout les mangas" : textSearch}</h1>
      <div className="md:flex justify-between ms-12 md:ms-36 me-36">
        <Search onKeyDown={(e) => { if (e.key === "Enter") { handleSearchPartial(e) } }} onClick={handleSearch} />
        <div className="flex">
          <Tag onClick={filterAllManga} key={"all"} tag={"all"} />
          <Tag onClick={() => handleTag("Aventure")} key={"aventureFilter"} tag={"Aventure"} />
          <Tag onClick={() => handleTag("Romance")} key={"romanceFilter"} tag={"Romance"} />
          <Tag onClick={() => handleTag("Shonen")} key={"shonenFilter"} tag={"Shonen"} />
        </div>
        <Filter categories={category} onChange={(e) => handleSearchFilter(e)} />
      </div>
      <div>
        {!NoManga &&
          <div className="flex flex-wrap justify-center md:justify-start pt-24">
            {filteredMangaData.map(manga => {
              const [tag1, tag2] = getTag(manga, category, categoryManga);
              return (
                <div className="mx-2 hover:scale-110" key={manga.id}>
                  <div type="button" onClick={() => router.push(`mangas/${manga.id}`)}>
                    <OneManga src={`https://mangaclubimage.s3.eu-north-1.amazonaws.com/${manga.source}`} {...manga} onClick={() => handleTag(tag1, tag2)} tag1={tag1} tag2={tag2} />
                  </div>
                </div>
              );
            })}
          </div>}
        {NoManga && <div className="text-center pt-36 text-2xl font-bold">No Manga Found</div>}
      </div>
    </div>
  );
}
