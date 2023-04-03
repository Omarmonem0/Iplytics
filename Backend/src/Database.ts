import Knex from "knex";
import { knexConfig } from "./knexfile"

export class Database {
    private static connection : any;

    private constructor() {

    }

    public static getConnection() {
        return Database.connection
    }

    public static async connect() {
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