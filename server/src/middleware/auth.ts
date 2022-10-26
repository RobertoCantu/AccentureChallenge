import { NextFunction, Request, Response } from 'express';

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.user = {
        id: '63595c5411c211b76ce790d4',
    };
    next();
};
