exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE mangas RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE TABLE categories RESTART IDENTITY CASCADE");

  const categories = await knex("categories").insert([
    {
     name:"Action",
      },
    {
     name:"Aventure",
      },
    {
     name:"Romance",
      },
    {
     name:"Comédie",
      },
    {
     name:"Shonen",
    },
  ] ).returning('*')

  const mangas = await knex("mangas").insert([
    { name: "One Piece" },
    { name: "Naruto" },
    { name: "Bleach" },
    { name: "Gintama" },
    { name: "Jujutsu" },
  ]).returning('*')

  const mangaCategories = await knex("MangaCategory").insert([
    { manga_id: mangas[0].id, category_id: categories[0].id },
    { manga_id: mangas[0].id, category_id: categories[4].id },
    { manga_id: mangas[1].id, category_id: categories[0].id },
    { manga_id: mangas[1].id, category_id: categories[1].id },
    { manga_id: mangas[2].id, category_id: categories[2].id },
    { manga_id: mangas[2].id, category_id: categories[3].id },
    { manga_id: mangas[3].id, category_id: categories[2].id },
    { manga_id: mangas[3].id, category_id: categories[4].id },

  ]).returning('*')


};
