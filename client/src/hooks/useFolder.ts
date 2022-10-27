import { Folder } from "@prisma/client";
import { useEffect, useState } from "react";
import {
	FolderItems,
	getFolderObjects,
	getRootFolder,
} from "../services/folderService";

export const useFolder = (folderId?: string) => {
	const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(
		folderId
	);
	const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
	const [folderItems, setFolderItems] = useState<FolderItems | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const switchFolder = (folderId: string) => setCurrentFolderId(folderId);

	useEffect(() => {
		setLoading(true);
		setError(null);
		getRootFolder()
			.then((rootFolder) => {
				setCurrentFolder(rootFolder);
			})
			.catch((err) => setError(err))
			.finally(() => setLoading(true));
	}, [currentFolderId]);

	useEffect(() => {
		if (!currentFolder) return;

		setLoading(true);
		setError(null);
		getFolderObjects(currentFolder?.id)
			.then((items) => {
				setFolderItems(items);
			})
			.catch((err) => setError(err))
			.finally(() => setLoading(true));
	}, [currentFolder]);

	return {
		switchFolder,
		currentFolder,
		folderItems,
		loading,
		error,
	};
};
