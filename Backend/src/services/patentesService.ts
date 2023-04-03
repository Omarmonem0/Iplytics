import { IPatent } from "../models/patent";
import { PatentRespoistory } from "../repositories/patentsRespository";

export class PatentService {
    private repository: PatentRespoistory;
    constructor() {
        this.repository = new PatentRespoistory()
    }

    async create(patent: IPatent): Promise<Number> {
        try {
            return await this.repository.create(patent)
        } catch (e) {
            throw e
        }
    }
}