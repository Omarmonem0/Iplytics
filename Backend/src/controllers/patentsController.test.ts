import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../constants";
import { PatentController } from './patentsController';
import { PatentService } from "../services/patentesService";
import { IPatent } from "../models/patent";



describe("Test Patent Controller", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
        };
    });



    it("Patent created sucessfully", async () => {
        const patentService: Partial<PatentService> = {
            create: jest.fn((patent: IPatent) => Promise.resolve(1))
        };

        const patentController = new PatentController(patentService as PatentService)
        mockRequest.body = {
            title: "Mock Patent",
            publication_date: "01-11-1996"
        }

        await patentController.create(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.statusCode).toBe(STATUS_CODES.success)
        expect(mockResponse.json).toBeCalledWith({
            data: { title: "Mock Patent", publication_date: "01-11-1996", publication_number: 1 },
            message: ""
        })

    })

    it("Patent not create due to error", async () => {
        const patentService: Partial<PatentService> = {
            create: jest.fn((patent: IPatent) => Promise.reject())
        };

        const patentController = new PatentController(patentService as PatentService)
        mockRequest.body = {
            title: "Mock Patent",
            publication_date: "01-11-1996"
        }

        await patentController.create(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.statusCode).toBe(STATUS_CODES.internalServerError)
        expect(mockResponse.json).toBeCalledWith({
            message: "Internal server error"
        })
    })

})