// Routing
import { Outlet } from 'react-router-dom';

// Material UI
import {
    styled,
    useTheme,
    Container,
    Box,
    AppBar,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// Components
import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';
import { margin } from '@mui/system';
import { ClassNames } from '@emotion/react';
import TestNavBar from './testNavBar';
import TestSidebar from './testSidebar';
// import { useFolder } from '../hooks/useFolder';
import * as FileService from '../services/fileService';
import { useWorkspace } from '../hooks/useWorkspace';

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    flexWrap: 'wrap',
    //overflow: 'hidden'
});

const DRAWER_WIDTH = 280;
const drawerWidth = 240;

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    // marginLeft: '180px',
    //width: `calc(100% - ${DRAWER_WIDTH}px)`
}));

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function DashboardLayout() {
    const theme = useTheme();
    const pages = ['Inicio'];
    const workspace = useWorkspace();
    const [file, setFile] = React.useState<File | null>(null);

    return (
        <Box sx={{ display: 'flex' }}>
            <DashboardNavbar />
            <DashboardSidebar />
            <MainStyle>
                <Outlet />
                <div>
                    hola
                    {workspace.folderItems?.folders.map((folder) => (
                        <button
                            onClick={() => workspace.switchFolder(folder.id)}
                        >
                            {folder.name}
                        </button>
                    ))}
                    {workspace.folderItems?.files.map((note) => (
                        <div style={{ margin: 5 }}>
                            <button
                                onClick={((file_) => () => {
                                    workspace.updateNote(
                                        file_.id,
                                        {
                                            name: 'UPDATED_README_new.md',
                                        },
                                        file ?? undefined
                                    );
                                })(note)}
                            >
                                file: {note.name}
                            </button>
                            <button
                                onClick={() => {
                                    FileService.getFileResource(note.id)
                                        .then((res) => console.log(res))
                                        .catch(console.error);
                                }}
                            >Get resource </button>
                        </div>
                    ))}
                    <button
                        onClick={() =>
                            workspace.addFolder(
                                'nuevo folder' + workspace.currentFolder?.name
                            )
                        }
                    >
                        Crear folder
                    </button>
                    <input
                        multiple={false}
                        type="file"
                        onChange={(ev) => {
                            // ev.target.files
                            console.log(ev.target.files);
                            if (ev.target.files && ev.target.files.length > 0) {
                                setFile(ev.target.files[0]);
                            } else {
                                setFile(null);
                            }
                        }}
                    ></input>
                    <button
                        onClick={() => {
                            if (file) {
                                workspace.addNote(file.name, file);
                            }
                        }}
                    >
                        Subir nota
                    </button>
                </div>
            </MainStyle>
        </Box>
    );
}
