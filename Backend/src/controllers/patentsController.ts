import {  Request, Response } from "express";
import { IPatent } from "../models/patent";
import { PatentService } from "../services/patentesService";

export class PatentController {
    private service: PatentService;
    constructor() {
        this.service = new PatentService()
    }

    async create(req: Request, res: Response) {
        try {
            const patent : IPatent = {
                title: req.body.title,
                publication_date: req.body.publication_date
            }
            const patentNumber = await this.service.create(patent)
            res.statusCode = 200
            res.json({
                message: "",
                data: {...patent, publication_number: patentNumber}
            })
        } catch (e) {
            res.statusCode = 500
            res.json({
                message: "Internal server error"
            })
        }
    }
}