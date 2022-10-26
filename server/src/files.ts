import { File } from '@prisma/client';
import { db } from './utils/db.server';
import { deleteObject } from './utils/s3-utills';

export async function createFile(
    name: string,
    userId: string,
    folderId: string,
    s3Path: string
): Promise<File> {
    const created = await db.file.create({
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
    const entry = await db.file.findUnique({
        where: {
            id: fileId,
        },
    });

    return entry;
}

export async function deleteFile(fileId: string): Promise<File> {
    const deleted = await db.file.delete({
        where: {
            id: fileId,
        },
    });

    await deleteObject(deleted.resourceUrl);

    return deleted;
}

export async function updateFile(
    fileId: string,
    data: Partial<File>
): Promise<File> {
    const origin = await getFile(fileId);
    const created = await db.file.update({
        where: {
            id: data.id,
        },
        data: {
            ...origin,
            ...data,
        },
    });

    if (origin?.resourceUrl && origin.resourceUrl != created.resourceUrl) {
        await deleteObject(origin.resourceUrl);
    }

    return created;
}
