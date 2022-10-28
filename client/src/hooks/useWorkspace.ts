import { Folder } from '@prisma/client';
import { useEffect, useState } from 'react';
import {
    FolderItems,
    getFolderObjects,
    geFolder,
    createFolder,
} from '../services/folderService';

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
        currentFolder,
        folderItems,
        loading,
        error,
    };
};
