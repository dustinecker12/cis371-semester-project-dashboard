import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db, logout } from '../../../firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';

export default function ResponsiveAppBar(): JSX.Element {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const nav = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.log('An error occured while fetching user data', err);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setName('');
      return nav('/');
    }
    fetchUserName();
  }, [user, loading]);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    setAnchorElUser(null);
    nav('/profile');
  };

  const handleSettings = () => {
    setAnchorElUser(null);
    nav('/settings');
  };

  const handleLogin = () => {
    setAnchorElUser(null);
    nav('/login');
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    setName('');
    logout();
    nav('/');
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          dispaly: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Box>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt={name}
              // src="/static/images/avatar/2.jpg"
              sx={{ marginRight: 1 }}
            />
            <Typography color="white">{name}</Typography>
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {!user ? (
              <MenuItem onClick={handleLogin}>
                <LogoutIcon
                  sx={{
                    pr: '15px',
                  }}
                />
                <Typography>Log in</Typography>
              </MenuItem>
            ) : (
              <Box>
                <MenuItem onClick={handleProfile}>
                  <PersonIcon
                    sx={{
                      pr: '15px',
                    }}
                  />
                  <Typography>Profile</Typography>
                </MenuItem>

                <MenuItem onClick={handleSettings}>
                  <SettingsIcon
                    sx={{
                      pr: '15px',
                    }}
                  />
                  <Typography>Settings</Typography>
                </MenuItem>

                <Divider />
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon
                    sx={{
                      pr: '15px',
                    }}
                  />
                  <Typography>Log out</Typography>
                </MenuItem>
              </Box>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
