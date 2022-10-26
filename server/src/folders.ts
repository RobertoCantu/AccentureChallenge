import { File, Folder } from '@prisma/client';
import { db } from './utils/db.server';
import { deleteObject } from './utils/s3-utills';

export async function createFolder(
    name: string,
    userId: string,
    parentId: string
): Promise<Folder> {
    const created = await db.folder.create({
        data: {
            name,
            userId,
            parentId,
        },
    });

    return created;
}

export async function getFolder(folderId: string): Promise<Folder | null> {
    const entry = await db.folder.findUnique({
        where: {
            id: folderId,
        },
    });
    return entry;
}

export async function deleteFolder(folderId: string): Promise<Folder> {
    const toDelete = await db.folder.findUnique({
        where: {
            id: folderId,
        },
        include: {
            children: {
                select: {
                    id: true,
                },
            },
            files: {
                select: {
                    id: true,
                    resourceUrl: true,
                },
            },
        },
    });

    if (toDelete) {
        await Promise.all([
            ...toDelete.files.map((file) => deleteObject(file.resourceUrl)),
            ...toDelete.children.map((child) => deleteFolder(child.id)),
        ]);
    }

    const deleted = await db.folder.delete({
        where: {
            id: folderId,
        },
    });

    return deleted;
}

export async function updateFolder(
    folderId: string,
    data: Partial<Folder>
): Promise<Folder> {
    const origin = await getFolder(folderId);
    const created = await db.folder.update({
        where: {
            id: folderId,
        },
        data: {
            ...origin,
            ...data,
        },
    });

    return created;
}
