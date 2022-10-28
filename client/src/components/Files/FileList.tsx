import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FileCard from "./FileCard";

// Hooks
import { useWorkspace } from "../../hooks/useWorkspace";

function FileList() {
	// File array
	const files = [{ name: "File 1" }, { name: "File2" }];

	const { error, currentFolder } = useWorkspace();
	console.log("errror", error);
	console.log(currentFolder);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				{files.map((file, index) => {
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
