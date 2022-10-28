import { File as NoteFile } from '../@types/models';
import axios from '../utils/axios';

const FILE_API_PREFIX = '/api/v1/file';

export async function createFile(
    fileName: string,
    folderId: string,
    file: File
): Promise<NoteFile | null> {
    const body = new FormData();

    body.append('name', fileName);
    body.append('folderId', folderId);
    body.append('note', file);

    return axios
        .post(`${FILE_API_PREFIX}/`, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            if (res.status === 200) return res.data;
            throw res.data;
        })
        .catch(console.error);
}

export async function updateFile(
    fileId: string,
    update: Partial<NoteFile>,
    file?: File
): Promise<NoteFile | null> {
    const body = new FormData();

    Object.keys(update).forEach((key) => {
        // @ts-ignore
        body.append(key, update[key]);
    });

    if (file) body.append('note', file);

    return axios
        .put(`${FILE_API_PREFIX}/${fileId}`, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            if (res.status === 200) return res.data;
            throw res.data;
        })
        .catch(console.error);
}

export async function getFileResource(fileId: string) {
    return axios.get(`${FILE_API_PREFIX}/resource/${fileId}`).then((res) => {
        if (res.status === 200) return res.data;
        throw res.data.resourceUrl;
    });
}
