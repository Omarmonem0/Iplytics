

import express from 'express';
import { router } from "./routes";
import dotenv from 'dotenv';
import { Database } from './Database';
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
        await Database.getConnection()
        app.listen(port, () => console.log(`🚀 Server ready at http://localhost:${port}`))
    } catch (e) {
        console.log(e)
    }
}

start()
