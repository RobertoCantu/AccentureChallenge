import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FileCard from "./FileCard";

function FileList() {
	// File array
	const files = [{ name: "File 1" }, { name: "File2" }];
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				{files.map((file) => {
					return (
						<Grid item xs={4}>
							<FileCard name={file.name} />
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}

export default FileList;
