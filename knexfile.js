require('dotenv').config()
const path = require('path')

const { DB_NAME, DB_HOST, DB_USER, DB_PASS } = process.env

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      database: DB_NAME,
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, 'src/database/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src/database/seeds'),
    },
  },

  test: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, 'src/database/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src/database/seeds'),
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, 'src/database/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'src/database/seeds'),
    },
  },
}
