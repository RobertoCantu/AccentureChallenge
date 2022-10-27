import { Folder } from '@prisma/client';
import { db } from '../utils/db.server';
import { deleteObject } from '../utils/s3-utills';

export const createFolder = async (
    name: string,
    userId: string,
    parentId: string | null
): Promise<Folder> => {
    const created = await db.folder.create({
        data: {
            name,
            userId,
            parentId,
        },
    });

    return created;
};

export const getFolder = async (folderId: string): Promise<Folder | null> => {
    const entry = await db.folder.findUnique({
        where: {
            id: folderId,
        },
    });
    return entry;
};

export const getUserFolders = async (
    userId: string,
    parentId: string | undefined
): Promise<Folder[]> => {
    const whereQuery = parentId
        ? {
              parentId,
              userId,
          }
        : { userId };

    const entries = await db.folder.findMany({
        where: whereQuery,
    });

    return entries;
};

export const deleteFolder = async (folderId: string): Promise<Folder> => {
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
};

export const updateFolder = async (
    folderId: string,
    data: Partial<Folder>
): Promise<Folder> => {
    const created = await db.folder.update({
        where: {
            id: folderId,
        },
        data: {
            ...data,
        },
    });

    return created;
};
