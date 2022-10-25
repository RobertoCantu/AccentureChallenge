import { File } from '@prisma/client';
import { prismaClient } from './prisma';
import { deleteObject } from './s3-utills';

export async function createFile(
    name: string,
    userId: string,
    folderId: string,
    s3Path: string
): Promise<File> {
    const created = await prismaClient.file.create({
        data: {
            name,
            userId,
            folderId,
            resourceUrl: s3Path,
        },
    });

    return created;
}

export async function getFile(fileId: string): Promise<File | null> {
    const entry = await prismaClient.file.findUnique({
        where: {
            id: fileId,
        },
    });

    return entry;
}

export async function deleteFile(fileId: string): Promise<File> {
    const created = await prismaClient.file.delete({
        where: {
            id: fileId,
        },
    });

    deleteObject(created.resourceUrl);

    return created;
}

export async function updateFile(
    fileId: string,
    data: Partial<File>
): Promise<File> {
    const origin = await getFile(fileId);
    const created = await prismaClient.file.update({
        where: {
            id: data.id,
        },
        data: {
            ...origin,
            ...data,
        },
    });

    if (origin?.resourceUrl && origin.resourceUrl != created.resourceUrl) {
        deleteObject(origin.resourceUrl);
    }

    return created;
}
