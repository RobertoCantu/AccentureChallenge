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
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { CardActionArea, CardContent, DialogContentText } from "@mui/material";
import { Card } from "@mui/material";
import { Grid, Box } from "@mui/material";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { LoadingButton } from "@mui/lab";

// Hooks
import { useWorkspace } from "../hooks/useWorkspace";

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
	const { addFolder } = useWorkspace();

	const handleClick = (event: React.MouseEvent<HTMLElement> | any) => {
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

	const somestyle = {
		color: "red",
		fontSize: "10px",
	};

	return (
		<>
			{/* <Card
				sx={{ maxWidth: 345, height: "100%" }}
				style={{ backgroundColor: "#E8E8E8" }}
			>
				<CardActionArea>
					<CardContent>
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
						<Grid
							container
							direction="row"
							justifyContent="center"
							alignContent="center"
						>
							<AddIcon fontSize="large" />
						</Grid>
					</CardContent>
				</CardActionArea>
			</Card> */}
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignContent="center"
			>
				<Box sx={{}}>
					<AddIcon
						onClick={handleClick}
						fontSize="large"
						sx={{ marginTop: "35px" }}
					/>
				</Box>
			</Grid>

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
					Crear carpeta
				</MenuItem>
				<MenuItem onClick={handleOpenDialogFile} disableRipple>
					<AttachFileIcon />
					Upload File
				</MenuItem>
			</StyledMenu>

			<Dialog open={dialogOpen} onClose={handleClose}>
				<DialogTitle>Crear carpeta</DialogTitle>
				<Formik
					initialValues={{
						folderName: "",
					}}
					validate={(valores) => {
						let errores: any = {};
						console.log(valores.folderName);
						//Validación contraseña
						if (!valores.folderName) {
							errores.folderName = "Por favor ingresa el nombre de tu carpeta";

							return errores;
						}
					}}
					onSubmit={async (valores, { resetForm }) => {
						try {
							addFolder(valores.folderName);
						} catch (error) {
							resetForm();
						}
					}}
				>
					{({ errors, handleChange, values }: any) => (
						<Form>
							<Field type="text" id="correo" name="folderName" />
							<ErrorMessage
								name="folderName"
								component={() => (
									<div className="error">{errors.folderName}</div>
								)}
							/>
							<DialogActions>
								<Button variant="outlined" onClick={handleCloseDialogText}>
									Cancelar
								</Button>
								<LoadingButton variant="outlined" type="submit">
									Submit
								</LoadingButton>
							</DialogActions>
						</Form>
					)}
				</Formik>
				{/* <TextField
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
					/> */}
			</Dialog>

			<Dialog open={dialogOpenFile} onClose={handleClose}>
				<DialogTitle>UPLOAD NOTE FILE</DialogTitle>
				<DialogContent style={somestyle}>Just PDF files</DialogContent>
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
						<FileUploadIcon />
						Upload File
						<input type="file" hidden accept="application/pdf" />
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
		</>
	);
}
