import { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth, logout, db } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  getDocs,
  CollectionReference,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

type SidebarProps = {
  lineArr: Array<Line>;
};

type Line = {
  id: string;
  title: string;
};

export default function Sidebar({ lineArr }: SidebarProps): JSX.Element {
  const [user, loading, error] = useAuthState(auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    if (lineArr.length == 0) {
      getLines();
    } else {
      setLines(lineArr);
    }
  }, [lineArr]);

  const handleLogout = () => {
    logout();
    nav('/');
  };

  const getLines = async () => {
    const configColl: CollectionReference = collection(db, 'config/smt/lines');
    const tempLines: Array<Line> = [];

    try {
      await getDocs(configColl)
        .then((qs: QuerySnapshot) => {
          qs.forEach((qd: QueryDocumentSnapshot) => {
            let line: Line = {
              id: qd.id,
              title: qd.data().title,
            };

            tempLines.push(line);
          });
        })
        .then(() => {
          tempLines.sort((a: Line, b: Line) => a.title.localeCompare(b.title));
          setLines(tempLines);
          console.log('called getLines() from Sidebar');
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `#e0e0e0 !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="10px"
              >
                <img
                  alt="logo"
                  src="../src/assets/logo.png"
                  style={{ padding: 15, maxHeight: 30 }}
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            {/* Data */}
            <Typography
              variant="h6"
              fontSize="16px"
              color="grey"
              sx={
                isCollapsed
                  ? { textAlign: 'center', m: '15px auto 5px auto' }
                  : { m: '15px 0 5px 20px' }
              }
            >
              Data
            </Typography>

            <MenuItem
              style={{
                color: 'grey',
              }}
              icon={<DashboardIcon />}
            >
              <Typography>{'Dashboard'}</Typography>
              <Link to="/" />
            </MenuItem>

            {/* Lines */}
            <Typography
              variant="h6"
              fontSize="16px"
              color="grey"
              sx={
                isCollapsed
                  ? { textAlign: 'center', m: '15px auto 5px auto' }
                  : { m: '15px 0 5px 20px' }
              }
            >
              Lines
            </Typography>

            {lines.map((line, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  nav(`/lines/${line.id}`, { state: { line: line } });
                }}
                style={{
                  color: 'grey',
                }}
                icon={<PrecisionManufacturingIcon />}
              >
                <Typography>{line.title}</Typography>
              </MenuItem>
            ))}

            {/* Account */}
            <Typography
              variant="h6"
              fontSize="16px"
              color="grey"
              sx={
                isCollapsed
                  ? { textAlign: 'center', m: '15px auto 5px auto' }
                  : { m: '15px 0 5px 20px' }
              }
            >
              Account
            </Typography>

            {!user ? (
              <Box>
                <MenuItem
                  style={{
                    color: 'grey',
                  }}
                  icon={<SettingsIcon />}
                >
                  <Typography>{'Settings'}</Typography>
                  <Link to="/login" />
                </MenuItem>
                <MenuItem
                  style={{
                    color: 'grey',
                  }}
                  icon={<LogoutIcon />}
                >
                  <Typography>{'Log in'}</Typography>
                  <Link to="/login" />
                </MenuItem>
              </Box>
            ) : (
              <Box>
                <MenuItem
                  style={{
                    color: 'grey',
                  }}
                  icon={<SettingsIcon />}
                >
                  <Typography>{'Settings'}</Typography>
                  <Link to="/settings" />
                </MenuItem>

                <MenuItem
                  style={{
                    color: 'grey',
                  }}
                  onClick={handleLogout}
                  icon={<LogoutIcon />}
                >
                  <Typography>{'Log out'}</Typography>
                  <Link to="/" />
                </MenuItem>
              </Box>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
}
