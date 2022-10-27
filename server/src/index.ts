import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import express, { Application, Request, Response, type Express } from 'express';
import cors from 'cors';
import { s3FileUpload } from './middleware/multer';
import { prismaClient } from './prisma';
import multerS3 from 'multer-s3';
import { userRouter } from './user/user.router';

const app: Application = express();
// const prisma = new PrismaClient();

const port: number = 3001;

app.use(
    cors({
        origin: '*',
    })
);

app.use(express.json());

app.use("/api/v1/user/", userRouter);

app.get('/index', (req: Request, res: Response) => {
    res.send('Server running...');
});

app.post('/test_file', s3FileUpload.single('note'), (req, res) => {
    const file = req.file as Express.MulterS3.File;
    if (file) {
        const { bucket, key } = file;
        console.log(bucket, key);
    }

    res.send(200);
});

app.get('/test_create', async (req: Request, res: Response) => {
    const test_email = 'test_user@mail.com';
    const user_query = await prismaClient.user.findUnique({
        where: {
            email: test_email,
        },
    });

    if (!user_query) {
        // await prisma.user.create({
        //     data: {
        //         email: test_email,
        //         name: 'Test User',
        //     },
        // });

        res.status(200).send('Test user was created.');
    } else {
        res.status(200).send('Test user already exists.');
    }
});

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
});
