import { Database } from "../Database";
import { IPatent } from "../models/patent";

export class PatentRespoistory {

    async create(patent: IPatent): Promise<Number> {
        try {
            return await Database.getConnection().insert([patent], ['publication_number']).into('patents')
        } catch (e) {
            throw e
        }
    }
}