// Routing
import { Outlet } from 'react-router-dom';

// Material UI
import { styled, useTheme, Container, Box, AppBar, Toolbar, Typography, Menu, MenuItem, IconButton, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Components
import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  //overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
  paddingLeft: theme.spacing(8),
  paddingRight: theme.spacing(2)
}));

export default function DashboardLayout() {
    const theme = useTheme();
		const pages = ['Inicio'];
    //const { collapseClick } = useCollapseDrawer();
  
    return (
    <RootStyle>
			<DashboardSidebar/>
      <DashboardNavbar/>
      <Container maxWidth="xl" sx={{ height: '100%'}}>
        <MainStyle
          sx={{
            transition: theme.transitions.create('margin', {
              duration: theme.transitions.duration.complex
            }),
						// flex:1
            // ...(collapseClick && {
            //   ml: '102px'
            // })
          }}
        >
          <Outlet />
        </MainStyle> 
      </Container>
    </RootStyle>
    );
  }