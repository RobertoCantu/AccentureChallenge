import { S3Client } from '@aws-sdk/client-s3';

import assert from 'assert';

assert.ok(process.env.AWS_ACCESS_KEY, 'AWS Access Key is not set in env file');
assert.ok(
    process.env.AWS_SECRET_ACCESS_KEY,
    'AWS Access Key is not set in env file'
);

export const s3 = new S3Client({
    region: process.env.AWS_S3_REGION ?? 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
});
