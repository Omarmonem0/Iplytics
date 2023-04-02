import express, { Request, Response } from 'express';
import { createPatentMiddleware } from './../middlewares/CreatePatent';

export const router = express.Router();

// health check endpoint.
router.get("/health" , function (req: Request, res: Response) {
    res.status(200).json('Server is healthy');
})

// patents endpoints
router.post("/patents", createPatentMiddleware)