exports.seed = async function (knex) {
  // Supprimer les données existantes et réinitialiser les identités
  await knex.raw("TRUNCATE TABLE mangas RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE TABLE categories RESTART IDENTITY CASCADE");

  // Insérer des catégories
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

  // Insérer des mangas avec des catégories
  const mangas = await knex("mangas").insert([
    { name: "One Piece" },
    { name: "Naruto" },
    { name: "Bleach" },
    { name: "Gintama" },
    { name: "Jujutsu" },
  ]).returning('*')

  // Insérer des associations dans la table intermédiaire
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

  // Vous pouvez également logguer les données insérées si nécessaire
  console.log("Manga et catégorie:", mangaCategories);

};
