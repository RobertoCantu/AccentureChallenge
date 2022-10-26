import { Router } from 'express';
import { multerMiddleware } from '../middleware/multer';
import {
    createFileController,
    deleteFileController,
    getFileResourceController,
    getUserFilesController,
    updateFileController,
} from './file.controller';

const fileRouter = Router();

fileRouter
    .route('/')
    .get(getUserFilesController)
    .post(multerMiddleware.single('note'), createFileController)
    .put(updateFileController)
    .delete(deleteFileController);

fileRouter.get('/resource/:fileId', getFileResourceController);
