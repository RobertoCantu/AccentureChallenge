import { Folder } from '@prisma/client';
import { useEffect, useState } from 'react';
import {
    FolderItems,
    getFolderObjects,
    geFolder,
    createFolder,
    updateFolder as _updateFolder,
    deleteFolder as _deleteFolder,
} from '../services/folderService';
import * as FileService from '../services/fileService';
import { File as NoteFile } from '../@types/models';
import { deleteWhere, updateWhere } from '../utils/lists';

export type UseFolderValue = {
    switchFolder: (folderId: string) => void;
    currentFolder: Folder | null;
    folderItems: FolderItems | null;
    loading: boolean;
    error: any;
};

export const useWorkspace = (folderId?: string) => {
    const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(
        folderId
    );
    const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
    const [folderItems, setFolderItems] = useState<FolderItems | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const switchFolder = (folderId: string) => {
        setCurrentFolderId(folderId);
    };

    const addNote = (fileName: string, file: File) => {
        if (!currentFolderId || !folderItems) return;

        FileService.createFile(fileName, currentFolderId, file)
            .then((newFile) => {
                if (newFile) {
                    setFolderItems({
                        ...folderItems,
                        files: [...folderItems.files, newFile],
                    });
                }
            })
            .catch(setError);
    };

    const addFolder = (folderName: string) => {
        if (!currentFolderId || !folderItems) return;

        createFolder(folderName, currentFolderId)
            .then((folder) => {
                if (folder) {
                    setFolderItems({
                        ...folderItems,
                        folders: [...folderItems.folders, folder],
                    });
                } else {
                    console.error(
                        `Ya existe una carpeta con el nombre ${folderName}`
                    );
                }
            })
            .catch(setError);
    };

    const updateNote = (
        fileId: string,
        updates: Partial<NoteFile>,
        file: File | undefined
    ) => {
        if (!currentFolderId || !folderItems) return;

        FileService.updateFile(fileId, updates, file)
            .then((file) => {
                if (file) {
                    const updated = updateWhere(
                        folderItems.files,
                        file,
                        (file) => file.id === fileId
                    );
                    setFolderItems({
                        ...folderItems,
                        files: updated,
                    });
                } else {
                    console.error('Error al actualizar archivo');
                }
            })
            .catch(setError);
    };

    const updateFolder = (folderId: string, updates: Partial<Folder>) => {
        if (!currentFolderId || !folderItems) return;

        _updateFolder(folderId, updates)
            .then((folder) => {
                if (folder) {
                    setFolderItems({
                        ...folderItems,
                        folders: updateWhere(
                            folderItems.folders,
                            folder,
                            (file) => file.id === folderId
                        ),
                    });
                } else {
                    console.error('Error al actualizar el folder');
                }
            })
            .catch(setError);
    };

    const deleteNote = (fileId: string) => {
        if (!currentFolderId || !folderItems) return;

        FileService.deleteFile(fileId).then((_) => {
            setFolderItems({
                ...folderItems,
                files: deleteWhere(
                    folderItems.files,
                    (file) => file.id === fileId
                ),
            });
        });
    };

    const deleteFolder = (folderId: string) => {
        if (!currentFolderId || !folderItems) return;
        _deleteFolder(folderId).then((_) => {
            setFolderItems({
                ...folderItems,
                folders: deleteWhere(
                    folderItems.folders,
                    (folder) => folder.id === folderId
                ),
            });
        });
    };

    useEffect(() => {
        // Gets currrent folder data if root folder id is unkwown or current folder
        // data does not match current folder id
        if (
            !currentFolderId ||
            (currentFolder && currentFolder.id !== currentFolderId)
        ) {
            setLoading(true);
            setError(null);
            geFolder(currentFolderId)
                .then((rootFolder) => {
                    setCurrentFolder(rootFolder);
                    setCurrentFolderId(rootFolder.id);
                    setError(null);
                })
                .catch((err) => setError(err))
                .finally(() => setLoading(true));
        }
    }, [currentFolder, currentFolderId]);

    useEffect(() => {
        // Gets folder items (subfolders & files) once the current folder has resolved.
        if (
            !currentFolderId ||
            (folderItems && folderItems.folderId === currentFolderId)
        )
            return;
        setLoading(true);
        setError(null);
        getFolderObjects(currentFolderId)
            .then((items) => {
                setFolderItems(items);
                setError(null);
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(true));
    }, [currentFolderId, folderItems]);

    return {
        switchFolder,
        addFolder,
        addNote,
        updateNote,
        updateFolder,
        deleteNote,
        deleteFolder,
        currentFolder,
        folderItems,
        loading,
        error,
    };
};
