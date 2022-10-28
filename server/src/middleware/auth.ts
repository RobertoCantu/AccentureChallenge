import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log('getting req', request.path);
    try {
        const token = request.get('Authorization')?.split(' ')[1];

        if (token) {
            const decodedToken = jwt.verify(
                token,
                process.env.TOKEN_SECRET as string
            );
            request.user = { id: (<any>decodedToken).userId };
            next();
        } else {
            response.status(401).send('Token de acceso inválido');
            return;
        }
    } catch (error: any) {
        return response.status(401).json(error.message);
    }
};

// export const isAuthenticated = (
//    req: Request,
//    res: Response,
//    next: NextFunction
// ) => {
//    req.user = {
//        id: '6359925df824bbcd1cb2934a',
//    };
//    next();
// };
