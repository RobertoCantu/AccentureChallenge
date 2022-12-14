import { File, Folder } from '@prisma/client';
import { db } from '../utils/db.server';
import { deleteObject } from '../utils/s3-utills';

const checkFolderAlreadyExists = async (parentId: string, name: string) => {
    return (
        (await db.folder.count({
            where: {
                parentId,
                name,
            },
        })) != 0
    );
};

export const createFolder = async (
    name: string,
    userId: string,
    parentId: string | null
): Promise<Folder> => {
    if (!name || name.length == 0)
        throw new Error(`Folder name can't be empty.`);
    if (!parentId) {
        const hasRoot =
            (await db.folder.count({
                where: {
                    userId,
                    parentId: null,
                },
            })) != 0;

        if (hasRoot) throw new Error('User already has root folder.');
    }

    if (parentId && !(await checkFolderAlreadyExists(parentId, name)))
        throw new Error('Folder with same name already exists');

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

export const getFolderItems = async (
    folderId: string
): Promise<{ id: string; children: Folder[]; files: File[] } | null> => {
    const entry = await db.folder.findUnique({
        where: {
            id: folderId,
        },
        include: {
            children: true,
            files: true,
        },
    });

    return entry
        ? { id: entry.id, children: entry.children, files: entry.files }
        : null;
};

export const getUserRootFolder = async (
    userId: string
): Promise<Folder | null> => {
    const entry = await db.folder.findFirst({
        where: {
            userId,
            parentId: null,
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
        : { userId, parentId: null };

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
    if (data.name && data.name.length == 0)
        throw new Error(`Folder name can't be empty.`);

    const origin = await db.folder.findUnique({
        where: {
            id: folderId,
        },
    });

    if (origin?.parentId && data.name && !(await checkFolderAlreadyExists(origin.parentId, data.name)))
        throw new Error('Folder with same name already exists');

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
