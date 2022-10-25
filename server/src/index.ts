import { PrismaClient, User } from '@prisma/client';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { s3FileUpload } from './multer';

const app: Application = express();
const prisma = new PrismaClient();

dotenv.config();

const port: number = 3001;

console.log(process.env.AWS_ACCESS_KEY);

app.use(
    cors({
        origin: '*',
    })
);

app.get('/index', (req: Request, res: Response) => {
    res.send('Server running...');
});

app.post('/test_file', s3FileUpload.single('note'), (req, res) => {
    res.send(200);
});

app.get('/test_create', async (req: Request, res: Response) => {
    const test_email = 'test_user@mail.com';
    const user_query = await prisma.user.findUnique({
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
