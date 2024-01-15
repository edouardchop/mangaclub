exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE categories RESTART IDENTITY CASCADE")
  await knex("categories").insert([
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
  ] )
}