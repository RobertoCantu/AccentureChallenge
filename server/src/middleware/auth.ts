import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export const verifyToken = async (request: Request, response: Response, next: NextFunction ) => {
    try {
        const token = request.get("Authorization")?.split(" ")[1];

        if(token) {
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET as string);
            request.user = (<any>decodedToken).userId;
            next();
        } else {
            response.status(404).send("Token de acceso inválido");
            return;
        }

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
};