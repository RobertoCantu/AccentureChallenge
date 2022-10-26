import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator"

import * as AuthService from "./auth.service";
export const authRouter = express.Router();

authRouter.post(
    "/signup", 
    // body("email").isString(),
    // body("firstName").isString(), 
    // body("lastName").isString(),
    // body("password").isString(), 
    async (request: Request, response: Response) => {
        // const errors = validationResult(request);
        // if(!errors.isEmpty()) {
        //     console.log(request.body);
        //     return response.status(400).json({errors: errors.array()})
        // }
        try {
            // const user = request.body
            // const newUser = await AuthService.signup(user)
            // return response.status(201).json(newUser)
            return response.status(201).json("Signup works!")
        } catch (error: any) {
            return response.status(500).json(error.message)
        }
    }
);

authRouter.post("/login", async (request: Request, response: Response) => {
        try {
            return response.status(201).json("Login works!")
        } catch (error: any) {
            return response.status(500).json(error.message)
        }
    }
);

authRouter.post("/logout", async (request: Request, response: Response) => {
        try {
            return response.status(201).json("Logout works!")
        } catch (error: any) {
            return response.status(500).json(error.message)
        }
    }
);

authRouter.post("/refreshToken", async (request: Request, response: Response) => {
        try {
            return response.status(201).json("Refresh token works!")
        } catch (error: any) {
            return response.status(500).json(error.message)
        }
    }
);