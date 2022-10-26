import { File, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { db } from '../utils/db.server';
import { deleteObject, getObjectUrl } from '../utils/s3-utills';
import * as FileService from './file.service';

const validateFileToUser = async (fileId: string, req: Request) => {
    return new Promise(
        async (
            resolve: (f: File) => void,
            reject: (cb: (res: Response) => void) => void
        ) => {
            if (!req.user)
                return reject((res: Response) => res.sendStatus(400));

            const foundFile = await FileService.getFile(fileId);
            if (!foundFile)
                return reject((res: Response) => res.sendStatus(404));

            if (foundFile.userId != req.user.id)
                return reject((res: Response) =>
                    res
                        .status(400)
                        .send('File does not belong to current user.')
                );

            return resolve(foundFile);
        }
    );
};

export const createFileController = async (req: Request, res: Response) => {
    if (!req.user) return res.send(400);
    const file = req.file as Express.MulterS3.File;
    if (!file) res.sendStatus(500);

    const { key } = file;

    const fileName = req.body['name'];
    const folderId = req.body['folderId'];

    try {
        const createdFile = await FileService.createFile(
            fileName,
            req.user.id,
            folderId,
            key
        );
        if (createdFile.id) res.sendStatus(200);
        res.sendStatus(500);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getUserFilesController = async (
    req: Request<{ fileId: string }, {}, {}>,
    res: Response<Omit<File, 'resourceUrl'>[]>
) => {
    if (!req.user) return res.sendStatus(400);
    const userFiles = await db.file.findMany({
        where: {
            userId: req.user.id,
        },
        select: {
            createdAt: true,
            downVotes: true,
            folderId: true,
            id: true,
            isPublic: true,
            name: true,
            tags: true,
            updatedAt: true,
            upVotes: true,
            userId: true,
            resourceUrl: true,
        },
    });

    res.status(200).send(userFiles);
};

export const getFileResourceController = async (
    req: Request<{ fileId: string }, {}, {}>,
    res: Response<File | string>
) => {
    if (!req.user) return res.sendStatus(400);
    const fileId = req.params.fileId;

    const foundFile = await validateFileToUser(fileId, req)
        .then((file) => file)
        .catch((err) => err(res));
    if (!foundFile) return;

    const publicUrl = await getObjectUrl(foundFile.resourceUrl);

    const returnFile = {
        ...foundFile,
        resourceUrl: publicUrl,
    } as File;

    res.status(200).send(returnFile);
};

export const deleteFileController = async (
    req: Request<{ fileId: string }, {}, {}>,
    res: Response<File | string>
) => {
    if (!req.user) return res.sendStatus(400);
    const fileId = req.params.fileId;

    const foundFile = await validateFileToUser(fileId, req)
        .then((file) => file)
        .catch((err) => err(res));
    if (!foundFile) return;

    const publicUrl = await getObjectUrl(foundFile.resourceUrl);

    const returnFile = {
        ...foundFile,
        resourceUrl: publicUrl,
    } as File;

    res.status(200).send(returnFile);
};

export const updateFileController = async (
    req: Request<{ fileId: string }, {}, { file: Partial<File> }>,
    res: Response<File | string>
) => {
    if (!req.user) return res.sendStatus(400);
    const fileId = req.params.fileId;

    const foundFile = await validateFileToUser(fileId, req)
        .then((file) => file)
        .catch((err) => err(res));
    if (!foundFile) return;

    const file = req.body.file;
    if ('id' in file) delete file['id'];

    await FileService.updateFile(fileId, req.body.file);

    res.sendStatus(200);
};
