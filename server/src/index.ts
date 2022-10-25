import { PrismaClient, User } from '@prisma/client';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import { authRouter } from './auth/auth.router';

const app: Application = express();

dotenv.config();

const port: number = 3001;

// console.log(process.env.AWS_ACCESS_KEY);

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const fileName = 'test.txt';

const uploadFile = () => {
    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: 'accenturechallengetec', // pass your bucket name
            Key: 'test.txt', // file will be saved as testBucket/contacts.csv
            Body: JSON.stringify(data, null, 2),
        };
        s3.upload(params, function (s3Err: any, data: any) {
            if (s3Err) throw s3Err;
            console.log(`File uploaded successfully at ${data.Location}`);
        });
    });
};

// uploadFile();

app.use(
    cors({
        origin: '*',
    })
);

app.use("/api/v1/auth/", authRouter);

app.get('/index', (req: Request, res: Response) => {
    res.send('Server running...');
});

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
});
