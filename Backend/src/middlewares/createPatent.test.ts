import { NextFunction, Request, Response } from "express";
import { createPatentMiddleware } from "./createPatent";
import { STATUS_CODES } from "../constants";


describe("Test Create Patent Middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
        };
    });

    it("With blank body", async () => {
        const expectedResponse = { message: "Invalid title" }
        mockRequest = {
            body: {},
        };
        createPatentMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );
        expect(mockResponse.statusCode).toBe(STATUS_CODES.badRequest)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
    })

    it("Without title", async () => {
        const expectedResponse = { message: "Invalid title" }
        mockRequest = {
            body: {
                publication_date: "01-11-1996"
            },
        };
        createPatentMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );
        expect(mockResponse.statusCode).toBe(STATUS_CODES.badRequest)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
    })

    it("Without date", async () => {
        const expectedResponse = { message: "Invalid date" }
        mockRequest = {
            body: {
                title: "Mock title"
            },
        };
        createPatentMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );
        expect(mockResponse.statusCode).toBe(STATUS_CODES.badRequest)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
    })

    it("Invalid title", async () => {
        const expectedResponse = { message: "Invalid title" }
        mockRequest = {
            body: {
                title: 123,
                publication_date: "01-11-1996"
            },
        };
        createPatentMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );
        expect(mockResponse.statusCode).toBe(STATUS_CODES.badRequest)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
    })

    it("Invalid date", async () => {
        const expectedResponse = { message: "Invalid date" }
        mockRequest = {
            body: {
                title: "Mock title",
                publication_date: "123324"
            },
        };
        createPatentMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );
        expect(mockResponse.statusCode).toBe(STATUS_CODES.badRequest)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
    })

    it("valid request", async () => {
        mockRequest = {
            body: {
                title: "Mock title",
                publication_date: "01-11-1996"
            },
        };
        createPatentMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );
        expect(nextFunction).toBeCalledTimes(1)
    })



})