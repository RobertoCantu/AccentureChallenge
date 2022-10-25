import express, { Application, Request, Response } from 'express';

const app: Application = express();
import fs from 'fs';

import AWS from 'aws-sdk';
import * as dotenv from 'dotenv'

dotenv.config()

const port: number = 3001;

console.log(process.env.AWS_ACCESS_KEY)

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const fileName = 'test.txt'

const uploadFile = () => {
    fs.readFile(fileName, (err, data) => {
       if (err) throw err;
       const params = {
           Bucket: 'accenturechallengetec', // pass your bucket name
           Key: 'test.txt', // file will be saved as testBucket/contacts.csv
           Body: JSON.stringify(data, null, 2)
       };
       s3.upload(params, function(s3Err:any, data:any) {
           if (s3Err) throw s3Err
           console.log(`File uploaded successfully at ${data.Location}`)
       });
    });
  };

  uploadFile();
app.get('/index', (req: Request, res: Response) => {
    res.send('Server running...');
});

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
});
