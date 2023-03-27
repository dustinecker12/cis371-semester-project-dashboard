import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PieChartIcon from '@mui/icons-material/PieChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link } from 'react-router-dom';

export default function PermanentDrawerLeft() {
  const [open, setOpen] = React.useState(true);

  const drawerWidth = 240;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link
            to={'/reports'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemButton>
              <ListItemIcon>
                <PieChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
          </Link>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Lines" />
            {/* <Link to={'/lines'}><ListItemText primary="Lines" /></Link> */}
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to={'/lines/1'}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PrecisionManufacturingIcon />
                    </ListItemIcon>
                    <ListItemText primary="Line 1" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link
                to={'/lines/2'}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PrecisionManufacturingIcon />
                    </ListItemIcon>
                    <ListItemText primary="Line 2" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link
                to={'/lines/4'}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PrecisionManufacturingIcon />
                    </ListItemIcon>
                    <ListItemText primary="Line 4" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>

        <Divider />

        <List>
          <Link
            to={'/settings'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </Box>
  );
}
