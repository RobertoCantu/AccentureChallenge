import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import * as UserService from "./user.service";
import * as FolderService from '../folder/folder.service';

export const signup = async (
    req: Request<{}, {}, { email: string; firstName: string; lastName: string; password: string }>,
    res: Response
) => {
    const { email, firstName, lastName, password } = req.body;

    try {
        const existingUser = await UserService.getUser(email);
        
        if(existingUser) {
            res.status(404).send("Este email ya está vinculado a una cuenta");
            return;
        };

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        const createdUser = await UserService.createUser(
            email,
            firstName,
            lastName,
            hashPassword
        );

        const createMainFolder = await FolderService.createFolder(
            "root",
            createdUser.id,
            null
        );

        if (createdUser.id && createMainFolder.id) return res.status(201).send("Registro creado satisfactoriamente");
        return res.sendStatus(500);
    } catch (error: any) {
        return res.status(500).send(error.message)
    }
};

export const login = async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserService.getUser(email);
        
        if(!existingUser) {
            res.status(404).send("El usuario no existe");
            return;
        };

        bcrypt.compare(password, existingUser.password, function(err, result) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            if (!result) {
                res.status(404).send("El usuario o la contraseña son incorrectos");
                return;
            }
        });

        const accessToken = jwt.sign({userId: existingUser.id}, process.env.TOKEN_SECRET as string, {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME});

        return res.status(201).json({accessToken: accessToken, user: {firstName: existingUser.firstName, lastName: existingUser.lastName}});
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
};






