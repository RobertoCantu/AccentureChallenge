import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FileCard from "./FileCard";

// Components
import AddButton from "../AddButton";
// Hooks
import { useWorkspace } from "../../hooks/useWorkspace";

function FileList() {
	// File array
	const files = [{ name: "File 1" }, { name: "File2" }];

	// States
	const { error, currentFolder, folderItems, switchFolder, loading } =
		useWorkspace();
	const [currentFolderFiles, setCurrentFolderFiles] = useState<any>([]);
	const [currentFolderFolders, setCurrentFolderFolders] = useState<any>([]);

	// Functions
	const handleFileSwitch = (folderId: string) => {
		switchFolder(folderId);
	};

	useEffect(() => {
		console.log("usee efect");
		if (folderItems && loading) {
			setCurrentFolderFiles(folderItems.files);
			setCurrentFolderFolders(folderItems.folders);
		}
	}, [loading, currentFolder, folderItems]);

	console.log("errror", error);
	console.log("Soy el current folder", currentFolder);
	console.log("Children", currentFolderFolders);
	console.log("FOlder items", folderItems);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid item xs={3}>
					<AddButton />
				</Grid>
				{currentFolderFolders.map((file: any, index: number) => {
					return (
						<Grid key={index} item xs={3}>
							<FileCard
								name={file.name}
								handleClick={() => handleFileSwitch(file.id)}
							/>
						</Grid>
					);
				})}
				{currentFolderFiles.map((file: any, index: number) => {
					return (
						<Grid key={index} item xs={4}>
							<FileCard name={file.name} />
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}

export default FileList;
