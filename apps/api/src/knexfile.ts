// import 'dotenv/config';
import type { Knex } from 'knex';

export default {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './mydb.sqlite',
    },
    // pool: {
    //   min: 2,
    //   max: 10,
    // },
    migrations: {
      directory: './db/migrations',
      loadExtensions: ['.ts'],
    },
    seeds: {
      directory: './db/seeds',
      loadExtensions: ['.ts'],
    },
  },
} as { [key: string]: Knex.Config };
