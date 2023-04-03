import { Request, Response, NextFunction } from "express";
import moment from "moment";
import { STATUS_CODES } from "../constants";

export const createPatentMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isValidTitle = req.body.title && typeof req.body.title === 'string'
        && req.body.title.length > 0

    const isValidDate = moment(req.body.publication_date, "DD-MM-YYYY", true).isValid()

    if (!isValidTitle) {
        res.statusCode = STATUS_CODES.badRequest
        res.json({
            message: "Invalid title"
        })
    } else if (!isValidDate) {
        res.statusCode = STATUS_CODES.badRequest
        res.json({
            message: "Invalid date"
        })
    } else {
        next()
    }

}