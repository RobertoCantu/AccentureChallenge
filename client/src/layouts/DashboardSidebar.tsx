import React from 'react'
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';


// Material UI
import { Drawer, Box, Typography, Divider, Toolbar, List, ListItem, ListItemIcon, ListItemButton,
				ListItemText, AppBar, Container, IconButton, Menu, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

				
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
	
}));

function MuiDrawer() {
  return (

	<RootStyle>
		<Drawer 
			sx={{
				width: DRAWER_WIDTH,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: DRAWER_WIDTH,
					boxSizing: 'border-box',
				},
			}}
			variant="permanent"
			anchor="left"
		>
			<Toolbar />
				<Divider />
				<List>
					{['Mis Notas'].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
			</Drawer>
	</RootStyle>
  
  )
}

export default MuiDrawer