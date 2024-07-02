const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  // Hasher le mot de passe avant de l'insérer
  const hashedPassword = await bcrypt.hash('azerty', 10);

  await knex('users').del();

  await knex('users').insert([
    {
      firstname: "Edouard",
      lastname: "Edouard",
      username: "ed",
      email: "chop@gmail.com",
      password: hashedPassword,
      role: "admin",
    },
  ]);
};
