import { File } from '@prisma/client';
import { db } from '../utils/db.server';
import { deleteObject } from '../utils/s3-utills';

export const createFile = async (
    name: string,
    userId: string,
    folderId: string,
    s3Path: string
): Promise<File> => {
    if (!name || name.length == 0) throw new Error(`File name can't be empty`);

    const fileAlreadyExist =
        (await db.file.count({
            where: {
                name,
            },
        })) != 0;

    if (fileAlreadyExist)
        throw new Error(`File ${name} already exists in folder.`);

    const created = await db.file.create({
        data: {
            name,
            userId,
            folderId,
            resourceUrl: s3Path,
        },
    });

    return created;
};

export const getFile = async (fileId: string): Promise<File | null> => {
    const entry = await db.file.findUnique({
        where: {
            id: fileId,
        },
    });

    return entry;
};

export const deleteFile = async (fileId: string): Promise<File> => {
    const deleted = await db.file.delete({
        where: {
            id: fileId,
        },
    });

    await deleteObject(deleted.resourceUrl);

    return deleted;
};

export const updateFile = async (
    fileId: string,
    data: Partial<Omit<File, 'id'>>
): Promise<File> => {
    const origin = await db.file.findUnique({
        where: {
            id: fileId,
        },
        select: {
            resourceUrl: true,
            name: true
        },
    });

    if (!origin) throw new Error(`File does not exist`);

    if (data.name && data.name != origin.name) {
        const fileAlreadyExist =
            (await db.file.count({
                where: {
                    name: data.name,
                },
            })) != 0;

        if (fileAlreadyExist)
            throw new Error(`File ${data.name} already exists in folder.`);
    }

    const created = await db.file.update({
        where: {
            id: fileId,
        },
        data: {
            ...data,
        },
    });

    if (origin?.resourceUrl && origin.resourceUrl != created.resourceUrl) {
        await deleteObject(origin.resourceUrl);
    }

    return created;
};

export const getAllFiles = async (fileName: string): Promise<File[]> => {
    const files = await db.file.findMany({
        where: {
            name: {
              contains: fileName,
              mode: 'insensitive',
            },
          },
    });

    return files;
};
