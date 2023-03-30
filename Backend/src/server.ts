
import Knex from "knex";
import express from 'express';
import { knexConfig } from "./knexfile"
import { router } from "./routes";
import dotenv from 'dotenv';
dotenv.config();
var cors = require('cors')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(router)

async function start() {
    try {
        const port = process.env.PORT || 8000;
        await connectToDatabase()
        app.listen(port, () => console.log(`🚀 Server ready at http://localhost:${port}`))
    } catch (e) {
        console.log(e)
    }
}

async function connectToDatabase() {
    const knex = Knex(knexConfig["development"])
    await knex.raw("SELECT 1")
}

start()
