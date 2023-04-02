import { IPatent } from "../models/patent";
import { PatentRespoistory } from "../repositories/patentsRespository";

export class PatentService {
    private repository: PatentRespoistory;
    constructor() {
        this.repository = new PatentRespoistory()
    }

    async create(patent: IPatent) {
        try {
            await this.repository.create(patent)
        } catch (e) {
            throw e
        }
    }
}