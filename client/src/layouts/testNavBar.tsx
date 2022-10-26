import React from 'react'
import {AppBar, Toolbar, Typography, Box} from '@mui/material';

const drawerWidth = 240;

function testNavBar() {
  return (
    <Box>
    <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>

      </Box>
  )
}

export default testNavBar