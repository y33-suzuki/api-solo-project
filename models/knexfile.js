// Update with your config settings.
const config = require("../config");

module.exports = {
  devlopment: {
    client: "pg",
    connection: config.db.connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: __dirname + "./migrations",
    },
    seeds: {
      directory: __dirname + "./seeds",
    },
  },
};
