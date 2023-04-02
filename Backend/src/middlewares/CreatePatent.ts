import { Request, Response, NextFunction } from "express";
import moment from "moment";

export const createPatentMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isValidTitle = req.body.title && typeof req.body.title === 'string'
        && req.body.title.length > 0

    const isValidDate = moment(req.body.publication_date, "DD-MM-YYYY", true).isValid()

    console.log(isValidTitle, isValidDate)

    if (!isValidTitle) {
        res.statusCode = 400
        res.json({
            message: "Invalid title"
        })
    } else if (!isValidDate) {
        res.statusCode = 400
        res.json({
            message: "Invalid date"
        })
    } else {
        next()
    }

}