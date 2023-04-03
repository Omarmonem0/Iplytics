import {  Request, Response } from "express";
import { IPatent } from "../models/patent";
import { PatentService } from "../services/patentesService";
import { STATUS_CODES } from "../constants";

export class PatentController {
    private service: PatentService;
    constructor(patentService?: PatentService) {
        if(patentService)
            this.service = patentService
        else
            this.service = new PatentService()
    }

    async create(req: Request, res: Response) {
        try {
            const patent : IPatent = {
                title: req.body.title,
                publication_date: req.body.publication_date
            }
            const patentNumber = await this.service.create(patent)
            res.statusCode = STATUS_CODES.success
            res.json({
                message: "",
                data: {...patent, publication_number: patentNumber}
            })
        } catch (e) {
            res.statusCode = STATUS_CODES.internalServerError
            res.json({
                message: "Internal server error"
            })
        }
    }
}