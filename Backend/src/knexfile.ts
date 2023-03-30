import type { Knex } from "knex";
import dotenv from 'dotenv';
dotenv.config();

// Update with your config settings.

export const knexConfig: { [key: string]: Knex.Config } = {

  development: {
    client: "pg",
    connection: {
      host : process.env.DB_HOST || "127.0.0.1",
      port : Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || "Iplytics",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "password"
    },
    pool: {
      min: Number(process.env.DB_MIN_POOL) || 2,
      max: Number(process.env.DB_MAX_POOL) || 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

};
