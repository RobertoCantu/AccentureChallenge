import { File, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { db } from '../utils/db.server';
import { deleteObject, getObjectUrl } from '../utils/s3-utills';
import * as FileService from './file.service';
import { ReqQuery } from '../../@types/custom';

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

export const createFileController = async (
    req: Request<{}, {}, { name: string; folderId: string }>,
    res: Response
) => {
    if (!req.user) return res.send(400);
    const file = req.file as Express.MulterS3.File;
    if (!file) return res.sendStatus(500);

    const { key } = file;
    const { name: fileName, folderId } = req.body;

    try {
        const createdFile = await FileService.createFile(
            fileName,
            req.user.id,
            folderId,
            key
        );
        if (createdFile.id) return res.status(200).send(createdFile);
        return res.sendStatus(500);
    } catch (error) {
        return res.status(500).send(error);
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
    req: Request<{ fileId: string }, {}, Partial<File>>,
    res: Response<File | string | unknown>
) => {
    if (!req.user) return res.sendStatus(400);
    const fileId = req.params.fileId;
    const fileData = req.file as Express.MulterS3.File;
    let updateData = { ...req.body };

    if (fileData) {
        const { key } = fileData;
        updateData = { ...updateData, resourceUrl: key };
    }

    const foundFile = await validateFileToUser(fileId, req)
        .then((file) => file)
        .catch((err) => err(res));
    if (!foundFile) return;

    if ('id' in updateData) delete updateData['id'];

    try {
        const updated = await FileService.updateFile(fileId, updateData);
        res.status(200).send(updated);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const searchFilesController = async (
    req: Request<{ fileName: string }, {}, {}>,
    res: Response<File[]>
) => {
    if (!req.user) return res.sendStatus(400);
    const { fileName } = req.query;

    if (fileName) {
        const files = await FileService.getAllFiles(fileName as string);
        return res.status(200).json(files);
    }
    return res.sendStatus(400);
};
