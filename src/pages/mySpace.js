import axios from "axios";
import OneManga from "@/components/OneManga";
import { useState } from "react";
import Tag from "@/components/Tag";
import Filter from "@/components/Filter";
import Search from "@/components/Search";
import getTag from "@/api/function/getTag.js";
import { useRouter } from "next/router";
import cookie from "cookie";

export const getServerSideProps = async ({ req }) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const categoryResponse = await axios.get("http://localhost:3000/api/category");
    const { data: categoryData } = categoryResponse;

    const userResponse = await axios.get('http://localhost:3000/api/auth/me', {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    const userData = userResponse.data.user;

    // Utilisez userData.userId pour filtrer les mangas
    const mangaResponse = await axios.get(`http://localhost:3000/api/manga?userId=${userData.userId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    const { data: mangaData } = mangaResponse;

    const categoryMangaResponse = await axios.get("http://localhost:3000/api/mangaCategories/categoryToManga", {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    const { data: categoryMangaData } = categoryMangaResponse;

    return {
      props: {
        category: categoryData.result,
        manga: mangaData.result,
        categoryManga: categoryMangaData.result,
        user: userData,
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        category: [],
        manga: [],
        categoryManga: [],
        user: null,
      }
    };
  }
};

export default function MySpace(props) {
  const router = useRouter();
  const { category, manga, categoryManga, user } = props;
  const [filteredMangaData, setFilteredMangaData] = useState(manga);
  const [NoManga, setNoManga] = useState(false);
  const [textSearch, setTextSearch] = useState("");


  const handleSearchPartial = async (e) => {
    setNoManga(false);
    const categoryValue = category.filter(item => item.name.toLowerCase() === e.target.value.toLowerCase());
    if (categoryValue.length != 0) {
      try {
        const categoryResponse = await axios.get(`http://localhost:3000/api/mangaCategories/categoryToManga/${categoryValue[0].id}`);
        setFilteredMangaData(categoryResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la catégorie :", error);
      }
    } else {
      setNoManga(true);
    }
  };

  const handleSearch = async (text) => {
    setNoManga(false);
    if (text.length != 0) {
      const categoryValue = category.filter(item => item.name.toLowerCase() === text.toLowerCase());
      if (categoryValue.length != 0) {
        try {
          const categoryResponse = await axios.get(`http://localhost:3000/api/mangaCategories/categoryToManga/${categoryValue[0].id}`);
          setFilteredMangaData(categoryResponse.data);
        } catch (error) {
          console.error("Erreur lors de la récupération de la catégorie :", error);
        }
      } else {
        setNoManga(true);
      }
    }
  };

  const handleTag = async (element) => {
    const categorySearch = category.filter(item => item.name == element.toLowerCase());
    if (categorySearch.length != 0) {
      const categoryResponse = await axios.get(`http://localhost:3000/api/mangaCategories/categoryToManga/${categorySearch[0].id}`);
      setFilteredMangaData(categoryResponse.data);
      setNoManga(false);
    } else {
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
      const categoryResponse = await axios.get(`http://localhost:3000/api/mangaCategories/categoryToManga/${idValue}`);
      setFilteredMangaData(categoryResponse.data);
      if (categoryResponse.data.length == 0) {
        setNoManga(true);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la catégorie :", error);
    }
  };

  return (
    <div>
      <h1 className="py-10 text-4xl font-bold text-black text-center">{textSearch === "" ? "Tout les mangas" : textSearch}</h1>
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
