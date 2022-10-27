import axios from '../utils/axios';

const FILE_API_PREFIX = '/api/v1/file';

export async function createFile(
    fileName: string,
    folderId: string,
    file: File
) {
    const body = new FormData();

    body.append('name', fileName);
    body.append('folderId', folderId);
    body.append('note', file);

    return axios
        .post(`${FILE_API_PREFIX}/`, body, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
            if (res.status === 200) return res.data;
            throw res.data;
        });
}

export async function getFileResource(fileId: string) {
    return axios.get(`${FILE_API_PREFIX}/resource/${fileId}`).then((res) => {
        if (res.status === 200) return res.data;
        throw res.data.resourceUrl;
    });
}
