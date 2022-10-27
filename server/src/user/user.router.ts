import { Router } from 'express';
import { validNewUser, validReturningUser } from '../validators/users'
import { signup, login } from './user.controller';

export const userRouter = Router();

userRouter
    .route('/signup')
    .post(validNewUser, signup)

userRouter
    .route('/login')
    .post(validReturningUser, login)