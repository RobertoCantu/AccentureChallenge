import { Router } from 'express';
import { isAuthenticated } from '../middleware/auth';
import { multerMiddleware } from '../middleware/multer';
import {
    createFileController,
    deleteFileController,
    getFileResourceController,
    getUserFilesController,
    updateFileController,
    searchFilesController
} from './file.controller';

export const fileRouter = Router();

fileRouter.use(isAuthenticated);

fileRouter
    .route('/')
    .get(getUserFilesController)
    .post(multerMiddleware.single('note'), createFileController);

fileRouter
    .route('/:fileId')
    .put(updateFileController)
    .delete(deleteFileController);

fileRouter.get('/resource/:fileId', getFileResourceController);

fileRouter.get('/search', searchFilesController);

