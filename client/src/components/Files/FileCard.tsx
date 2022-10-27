import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Icon, Grid } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

interface CardType {
	name: string;
}

function FileCard({ name }: CardType) {
	return (
		<Card sx={{ maxWidth: 345, height: "100%" }}>
			<CardActionArea>
				<CardContent>
					<FolderIcon fontSize="large" />
					<Typography gutterBottom variant="h5" component="div">
						{name}
					</Typography>
					<Grid container direction="row" justifyContent="flex-end">
						<IconButton size="small" color="primary">
							<EditIcon />
						</IconButton>
						<IconButton size="small" color="error">
							<DeleteIcon />
						</IconButton>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default FileCard;
