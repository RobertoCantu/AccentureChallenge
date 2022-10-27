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
import { useFolder } from '../hooks/useFolder';

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
    const currentFolder = useFolder();
    console.log(currentFolder);
    //const { collapseClick } = useCollapseDrawer();

    return (
        <Box sx={{ display: 'flex' }}>
            <DashboardNavbar />
            <DashboardSidebar />
            <MainStyle>
                <Outlet />
                <div>
                  hola
                </div>
            </MainStyle>
        </Box>
    );
}
