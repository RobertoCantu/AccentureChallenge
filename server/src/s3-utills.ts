import { S3 } from '@aws-sdk/client-s3';

export const MAIN_BUCKET = 'accenturechallengetec';

if (!process.env.AWS_ACCESS_KEY)
    throw new Error('AWS Access Key is not set in env file');
if (!process.env.AWS_SECRET_ACCESS_KEY)
    throw new Error('AWS Secret access Key is not set in env file');

export const s3 = new S3({
    region: process.env.AWS_S3_REGION ?? 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export function deleteObject(key: string) {
    s3.deleteObject({
        Bucket: MAIN_BUCKET,
        Key: key,
    });
}
