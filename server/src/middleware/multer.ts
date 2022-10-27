import multer from 'multer';
import multerS3 from 'multer-s3';
import { MAIN_BUCKET, s3 } from '../utils/s3-utills';

export const multerMiddleware = multer({
    storage: multerS3({
        s3,
        bucket: MAIN_BUCKET,
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        },
    }),
});
