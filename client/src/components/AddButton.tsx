import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === "light"
				? "rgb(55, 65, 81)"
				: theme.palette.grey[300],
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

export default function AddButton() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogOpenFile, setDialogOpenFile] = React.useState(false);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleOpenDialogText = () => {
		setAnchorEl(null);
    setDialogOpen(true);
	};

	const handleCloseDialogText = () => {
		setDialogOpen(false);
	};

  const handleOpenDialogFile = () => {
		setAnchorEl(null);
    setDialogOpenFile(true);
	};

	const handleCloseDialogFile = () => {
		setDialogOpenFile(false);
	};

	return (
		<div>
			<Button
				id="demo-customized-button"
				aria-controls={open ? "demo-customized-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				variant="contained"
				disableElevation
				onClick={handleClick}
				endIcon={<AddIcon />}
			>
				Add Note
			</Button>
			<StyledMenu
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={handleOpenDialogText} disableRipple>
					<NoteAddIcon />
					Create Note
				</MenuItem>
				<MenuItem onClick={handleOpenDialogFile} disableRipple>
					<AttachFileIcon />
					Upload File
				</MenuItem>
			</StyledMenu>

			<Dialog open={dialogOpen} onClose={handleClose}>
				<DialogTitle>CREATE NOTE</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Note Title"
						type="title"
						fullWidth
						variant="outlined"
					/>
					<TextField
						id="outlined-multiline-static"
						margin="dense"
						label="Note Content"
						multiline
						rows={5}
						fullWidth
						variant="outlined"
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Tag"
						type="tag"
						fullWidth
						variant="outlined"
					/>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={handleCloseDialogText}>
						CANCEL
					</Button>
					<Button variant="contained" onClick={handleClose}>
						SUBMIT
					</Button>
				</DialogActions>
			</Dialog>

      <Dialog open={dialogOpenFile} onClose={handleClose}>
				<DialogTitle>UPLOAD NOTE FILE</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Note Title"
						type="title"
						fullWidth
						variant="outlined"
					/>
          <Button variant="contained" component="label" color="primary">
            <FileUploadIcon/>Upload File
            <input type="file" hidden/>
          </Button>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Tag"
						type="tag"
						fullWidth
						variant="outlined"
					/>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={handleCloseDialogFile}>
						CANCEL
					</Button>
					<Button variant="contained" onClick={handleClose}>
						SUBMIT
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
