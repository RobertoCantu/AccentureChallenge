import { Folder } from '@prisma/client';
import { Request, Response } from 'express';
import * as FolderService from './folder.service';

const validateFolderToUser = async (folderId: string, req: Request) => {
    return new Promise(
        async (
            resolve: (f: Folder) => void,
            reject: (cb: (res: Response) => void) => void
        ) => {
            if (!req.user)
                return reject((res: Response) => res.sendStatus(400));

            const folder = await FolderService.getFolder(folderId);
            if (!folder) return reject((res: Response) => res.sendStatus(404));

            if (folder.userId != req.user.id)
                return reject((res: Response) =>
                    res
                        .status(400)
                        .send('File does not belong to current user.')
                );

            return resolve(folder);
        }
    );
};

export const createFolderController = async (
    req: Request<{}, {}, { name: string; parentId?: string }>,
    res: Response
) => {
    if (!req.user) return res.sendStatus(400);
    if (!req.body.parentId) {
        await FolderService.createFolder(req.body.name, req.user.id, null);
        return res.sendStatus(200);
    }
    const { name, parentId } = req.body;

    const folder = await validateFolderToUser(parentId, req)
        .then((folder) => folder)
        .catch((err) => err(res));
    if (!folder) return;

    await FolderService.createFolder(name, req.user.id, parentId);

    res.sendStatus(200);
};

export const getUserFoldersController = async (
    req: Request<{ parentId: string }, {}, {}>,
    res: Response<Folder[]>
) => {
    if (!req.user) return res.sendStatus(400);
    const { parentId } = req.params;
    const { id: userId } = req.user;

    const folder = await validateFolderToUser(parentId, req)
        .then((folder) => folder)
        .catch((err) => err(res));
    if (!folder) return;

    const folders = await FolderService.getUserFolders(userId, parentId);

    res.status(200).send(folders);
};

export const getFolderController = async (
    req: Request<{ folderId: string }, {}, {}>,
    res: Response<Folder>
) => {
    if (!req.user) return res.sendStatus(400);
    const { folderId } = req.params;

    const folder = await validateFolderToUser(folderId, req)
        .then((folder) => folder)
        .catch((err) => err(res));
    if (!folder) return;

    res.status(200).send(folder);
};

export const deleteFolderController = async (
    req: Request<{ folderId: string }, {}, {}>,
    res: Response<Folder>
) => {
    if (!req.user) return res.sendStatus(400);
    const { folderId } = req.params;

    const folder = await validateFolderToUser(folderId, req)
        .then((folder) => folder)
        .catch((err) => err(res));
    if (!folder) return;

    await FolderService.deleteFolder(folderId);

    res.sendStatus(200);
};

export const updateFolderController = async (
    req: Request<{ folderId: string }, {}, { folder: Partial<Folder> }>,
    res: Response<Folder>
) => {
    if (!req.user) return res.sendStatus(400);
    const { folderId } = req.params;
    const { folder } = req.body;

    const currentFolder = await validateFolderToUser(folderId, req)
        .then((folder) => folder)
        .catch((err) => err(res));
    if (!currentFolder) return;
    
    if ('id' in folder) delete folder['id'];
    await FolderService.updateFolder(folderId, folder);

    res.sendStatus(200);
};
