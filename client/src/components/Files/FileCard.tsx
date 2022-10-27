import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Icon } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

interface CardType {
	name: string;
}

function FileCard({ name }: CardType) {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<CardContent>
					<FolderIcon fontSize="large" />
					<Typography gutterBottom variant="h5" component="div">
						{name}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					Share
				</Button>
			</CardActions>
		</Card>
	);
}

export default FileCard;
