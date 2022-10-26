import { NextFunction, Request, Response } from 'express';

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('HOD', req.body);
    req.user = {
        id: '63595c5411c211b76ce790d4',
    };
    next();
};
