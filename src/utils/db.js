const { Client } = require('pg');


const client = new Client( {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  ssl: { rejectUnauthorized: false },

});

client.connect()
  .then(() => {
    console.log('Connecté à la base de données PostgreSQL');
  })
  .catch((err) => console.error('Erreur de connexion à la base de données', err))
  .finally(() => {
    client.end();
  });
