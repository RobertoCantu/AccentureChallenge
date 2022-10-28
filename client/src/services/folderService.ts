import axios from '../utils/axios';
import { File, Folder } from '../@types/models';
import { getAuthHeaders } from './authService';

const FOLDER_API_PREFIX = '/api/v1/folder';

export type FolderItems = {
    folderId: string;
    folders: Folder[];
    files: File[];
};

export async function geFolder(folderId?: string): Promise<Folder> {
    if (!folderId)
        return await axios
            .get(`${FOLDER_API_PREFIX}/`, {
                headers: {
                    ...getAuthHeaders(),
                },
            })
            .then((res) => {
                if (res.status === 200) return res.data[0];
                throw res.data;
            });
    return await axios
        .get(`${FOLDER_API_PREFIX}/${folderId}`, {
            headers: {
                ...getAuthHeaders(),
            },
        })
        .then((res) => {
            if (res.status === 200) return res.data;
            throw res.data;
        });
}

export async function getFolderObjects(folderId: string): Promise<FolderItems> {
    return await axios
        .get(`${FOLDER_API_PREFIX}/items/${folderId}`, {
            headers: {
                ...getAuthHeaders(),
            },
        })
        .then((res) => {
            if (res.status === 200) return res.data;
            throw res.data;
        });
}

export async function createFolder(
    folderName: string,
    parentId: string
): Promise<Folder> {
    return await axios
        .post(
            `${FOLDER_API_PREFIX}/`,
            { name: folderName, parentId },
            {
                headers: {
                    ...getAuthHeaders(),
                },
            }
        )
        .then((res) => {
            if (res.status === 200) return res.data;
            throw res.data;
        })
        .catch(console.error);
}
