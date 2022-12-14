import './utils/typecheck';
import * as dotenv from 'dotenv';
dotenv.config();

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { multerMiddleware } from './middleware/multer';
import { db } from './utils/db.server';
import { userRouter } from './user/user.router';
import { fileRouter } from './file/file.router';
import { folderRouter } from './folder/folder.router';

const app: Application = express();

const port: number = 3001;

app.use(
    cors({
        origin: '*',
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user/", userRouter);
app.use('/api/v1/file/', fileRouter);
app.use('/api/v1/folder/', folderRouter);

app.get('/index', (req: Request, res: Response) => {
    res.send('Server running...');
});

app.post('/test_file', multerMiddleware.single('note'), (req, res) => {
    console.log(req.body);
    const file = req.file as Express.MulterS3.File;
    if (file) {
        const { bucket, key } = file;
        console.log(bucket, key);
    }

    res.send(200);
});

app.get('/test_create', async (req: Request, res: Response) => {
    const test_email = 'test_user@mail.com';
    const user_query = await db.user.findUnique({
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
