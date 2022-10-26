import { NextFunction, Request, Response } from 'express';

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.user = {
        id: '6359925df824bbcd1cb2934a',
    };
    next();
};
