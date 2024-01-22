import axios from 'axios';
import { useState, useEffect } from 'react';

export const getServerSideProps = async ({ params }) => {

  const categoryResponse = await axios.get("http://localhost:3000/api/category")
console.log("ici")
  const { data: categoryData } = categoryResponse


  return {
    props: {
      category: categoryData.result,

    }
  }
}
function Categories (props)
{
  const categories = props.category
  console.log("voici les categories : ", categories);

  return (
    <div>
      <h1>Liste des catégories</h1>
      {categories.map(category=><div key={category.name}>{category.name}</div>)}
    </div>
  );
}

export default Categories;
