const {Sequelize} = require( 'sequelize' );

const sequelize = new Sequelize( process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host:process.env.POSTGRES_HOST,
  dialect: 'postgres',
   ssl: true,  // Activer SSL
  dialectOptions: {
    ssl: {
      require: true,  // Utiliser sslmode=require
    },
  },
} );

module.exports = sequelize
