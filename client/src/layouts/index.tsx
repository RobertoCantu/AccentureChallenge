// Routing
import { Outlet } from 'react-router-dom';

// Material UI
import { styled, useTheme, Container, Box, AppBar, Toolbar, Typography, Menu, MenuItem, IconButton, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Components
import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';
import { margin } from '@mui/system';
import { ClassNames } from '@emotion/react';

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
	flexWrap: 'wrap'
  //overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
  paddingLeft: theme.spacing(8),
  paddingRight: theme.spacing(2),
	background: 'red',
	border: 'solid'
}));

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);


export default function DashboardLayout() {
    const theme = useTheme();
		const pages = ['Inicio'];
    //const { collapseClick } = useCollapseDrawer();
  
    return (
    <Box sx={{display:'flex'}}>
			<DashboardSidebar/> 
       <DashboardNavbar/>
			 {/* <div style={{'background': 'red', 'width': '100%'}}>Holaa</div>
			 <div style={{'background': 'blue', }}>Holaa2222</div> */}
      {/* <Container maxWidth="xl" sx={{background:'red'}}> */}
			<Offset>
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
			</Offset>
         
       {/* </Container> */}
    </Box>
    );
  }