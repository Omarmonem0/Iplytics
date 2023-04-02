import express, { Request, Response } from 'express';
import { createPatentMiddleware } from '../middlewares/createPatent';
import { PatentController } from '../controllers/patentsController';

export const router = express.Router();

const patentController = new PatentController()

// health check endpoint.
router.get("/health" , function (req: Request, res: Response) {
    res.status(200).json('Server is healthy');
})

// patents endpoints
router.post("/patents", createPatentMiddleware, patentController.create.bind(patentController))