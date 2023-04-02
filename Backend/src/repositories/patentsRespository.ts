import { Database } from "../Database";
import { IPatent } from "../models/patent";

export class PatentRespoistory {

    async create(patent: IPatent) {
        try {
            await Database.getConnection().insert([patent], ['publication_number']).into('patents')
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}