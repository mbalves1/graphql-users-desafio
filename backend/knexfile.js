// Update with your config settings.
require('dotenv').config()

module.exports = {
  client: 'mysql',
  connection: {
    // database: 'desafio-cap-04',
    host: process.env.APP_DB_HOST,
    port: process.env.APP_DB_PORT,
    database: process.env.APP_DB_NAME,
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    // database: 'projeto-final',
    // user:     'root',
    // password: 'mnbvcxz1234'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
