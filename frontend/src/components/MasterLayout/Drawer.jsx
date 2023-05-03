import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import MailIcon from "@mui/icons-material/Mail";
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import {StyledDrawer} from "../../styeldComponent/DashboardLayout.js";
import {Collapse} from "@mui/material";
import {StyledNavLink} from "../../styeldComponent/NavLink.js";

const DrawerComponent = ({open, clickDrawer}) => {

    const [openInbox, setOpenInbox] = React.useState(false);

    const handleClickInbox = () => {
        setOpenInbox(!openInbox);
    };
    const toggleDrawer = () => {
        clickDrawer()
    }

    return (
        <StyledDrawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <Typography
                    component="h4"
                    variant="h6"
                    noWrap
                    sx={{flexGrow: 1}}
                >
                    TaskManager
                </Typography>
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon/>
                </IconButton>
            </Toolbar>
            <Divider/>
            <List component="nav">
                <ListItemButton component={StyledNavLink} to="/">
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton component={StyledNavLink} to="/create">
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create New" />
                </ListItemButton>
                <ListItemButton component={StyledNavLink} to="/new-task">
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="New Task" />
                </ListItemButton>
                <ListItemButton component={StyledNavLink} to="/progress">
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="In Progress" />
                </ListItemButton>
                <ListItemButton component={StyledNavLink} to="/completed">
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Completed" />
                </ListItemButton>
                <ListItemButton component={StyledNavLink} to="/canceled">
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Canceled" />
                </ListItemButton>
                <ListItemButton onClick={handleClickInbox}>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {openInbox ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openInbox} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </StyledDrawer>
    );
};

export default DrawerComponent;