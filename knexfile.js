const { config } = require("dotenv")
const { resolve } = require('path')
config()

const knexfile = {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    directory: resolve("src/api/db/migrations"),
  },
  seeds: {
    directory: resolve("src/api/db/seeds"),
  },
}

module.exports = knexfile
