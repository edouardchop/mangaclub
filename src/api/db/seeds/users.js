exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
  await knex("users").insert([
    {
      name: "Ed",
      surname: "Chop",
      username: "superSaiyan",
      email:"vegetalesang@gmail.com"
    },
   {
      name: "Eren",
      surname: "Jaeger",
      username: "xoxo",
      email:"tousensemble@gmail.com"
    },
   {
      name: "Harry",
      surname: "Potter",
      username: "Voldy",
      email:"noname@gmail.com"
    },
  ])
}

