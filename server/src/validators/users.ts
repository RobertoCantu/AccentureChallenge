import type { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import { validateResult } from "../middleware/validator"

export const validNewUser = [
    check("email")
        .not()
        .isEmpty()
        .withMessage("El correo es requerido")
        .isEmail()
        .withMessage("El correo debe ser válido"),
    check("firstName")
        .not()
        .isEmpty()
        .withMessage("El nombre es requerido")
        .isString()
        .withMessage("El nombre debe ser una cadena de texto válida"),
    check("lastName")
        .not()
        .isEmpty()
        .withMessage("El apellido es requerido")
        .isString()
        .withMessage("El apellido debe ser una cadena de texto válida"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("La contraseña es requerida")
        .isLength({min: 6, max: 20})
        .withMessage("La contraseña debe de contar con un largo de entre 6-20 caracteres")
        .matches(/\d/)
        .withMessage("La contraseña debe de contar con al menos un número")
        .matches(/[A-Z]/)
        .withMessage("La contraseña debe de contar con al menos una mayúscula")
        .matches(/\W/)
        .withMessage("La contraseña debe de contar con al menos un carácter especial"),
    (request: Request, response: Response, next: NextFunction) => {
        validateResult(request, response, next);
    }
];

export const validReturningUser = [
    check("email")
        .not()
        .isEmpty()
        .withMessage("El correo es requerido")
        .isEmail()
        .withMessage("El correo debe ser válido"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("La contraseña es requerida")
        .isString()
        .withMessage("El contraseña debe ser una cadena de texto válida"),
    (request: Request, response: Response, next: NextFunction) => {
        validateResult(request, response, next);
    }
];