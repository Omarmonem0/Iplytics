import Knex from "knex";
import { knexConfig } from "./knexfile"

export class Database {
    private static connection : any;

    private constructor() {

    }

    public static async getConnection() {
        if (!Database.connection) {
            await Database.connect()
        }
        return Database.connection
    }

    private static async connect() {
        try {
            const knex = Knex(knexConfig["development"])
            await knex.raw("SELECT 1")
            await knex.migrate.latest({ directory: "src/migrations" })
            Database.connection = knex
        } catch (e) {
            console.log("Can't connect to DB")
        }
       
    }
}