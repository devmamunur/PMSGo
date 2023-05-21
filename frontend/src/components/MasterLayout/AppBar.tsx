import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {StyledAppBar} from "@/styeldComponent/DashboardLayout";
import Box from "@mui/material/Box";
import {Avatar, Menu, MenuItem, Tooltip} from "@mui/material";
import {removeSession, getUserDetails} from "@/helper/SessionHelper";
import {NavLink} from "react-router-dom";

const AppBarComponent = ({open, clickDrawer}) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const toggleDrawer = () => {
        clickDrawer()
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const logout = () => {
        removeSession()
    }
    return (
        <>
            <StyledAppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        Dashboard
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={getUserDetails()[0].photo} />
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
                            <MenuItem component={NavLink} to="/profile"  onClick={handleCloseUserMenu}>
                                <Typography  textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem  onClick={handleCloseUserMenu}>
                                <Typography  onClick={logout} textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </StyledAppBar>
        </>
    );
};

export default AppBarComponent;