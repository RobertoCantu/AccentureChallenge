import { Router } from 'express';
import { isAuthenticated } from '../middleware/auth';
import {
    createFolderController,
    deleteFolderController,
    getFolderController,
    getFolderItemsController,
    getUserFoldersController,
    updateFolderController,
} from './folder.controller';

export const folderRouter = Router();

folderRouter.use(isAuthenticated);

folderRouter
    .route('/')
    .get(getUserFoldersController)
    .post(createFolderController);

folderRouter
    .route('/:folderId')
    .get(getFolderController)
    .put(updateFolderController)
    .delete(deleteFolderController);

folderRouter.route('/items/:folderId').get(getFolderItemsController);
