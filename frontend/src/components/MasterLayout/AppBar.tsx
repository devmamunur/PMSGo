'use client';
import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { StyledAppBar } from '@/lib/styeldComponent/DashboardLayout';
import Box from '@mui/material/Box';
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import SessionHelper from '@/helpers/session.helper';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import ToastHelper from '@/helpers/toast.helper';

interface AppBarComponentProps {
  open: boolean;
  clickDrawer: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
  open,
  clickDrawer,
}) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const toggleDrawer = () => {
    clickDrawer();
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logout = () => {
    signOut({ callbackUrl: '/' }).then(r => {
      ToastHelper.successToast('Successfully Logout');
    });
  };
  return (
    <>
      <StyledAppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>

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
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link href="/profile">
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Link>

              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={logout} textAlign="center">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

export default AppBarComponent;
