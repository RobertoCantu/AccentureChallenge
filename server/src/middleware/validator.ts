import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator"

export const validateResult = async (request: Request, response: Response, next: NextFunction ) => {
    try {
        validationResult(request).throw();
        return next()
    } catch (error: any) {
        return response.send({ errors: error.array()[0].msg });
    }
};