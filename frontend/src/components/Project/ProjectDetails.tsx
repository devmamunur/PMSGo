'use client';
import React, {useEffect, useState} from 'react';
import { useParams } from 'next/navigation';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AvatarGroup from '@mui/material/AvatarGroup';
import Card from '@mui/material/Card';
import {projectsService} from '@/services/api/projects/projects.service';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store/store';

const ProjectDetails = () => {
    const params  = useParams();
    const projectId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const open = Boolean(anchorEl);
    
    useEffect(() => {
        let isMounted = true;
        if(projectId){
            projectsService.getSingle(projectId).then((res) => {
                isMounted = false;
            }).catch((err) => {
                isMounted = false
            });
        }
        return () => {
            isMounted = false;
        };
    }, [projectId]);

    const project = useSelector((state: RootState) => state.projects.project);

    console.log('Single Project is : ', project);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEdit = (id : any) => {
        setOpenDialog(true);
    }

    return (
        <>
            <Grid container direction="row">
                <Grid item md={8}>
                    <Card elevation={2}>
                        <CardHeader
                            sx={{ paddingBottom : '25px' }}
                            action={
                                <>
                                    <IconButton
                                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton >
                                    <Menu
                                        id="demo-positioned-menu"
                                        aria-labelledby="demo-positioned-button"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <MenuItem onClick={() => handleEdit()}>Edit</MenuItem>
                                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                                    </Menu>
                                </>
                            }
                            title={
                              <h4 className="text-2xl font-medium">project name</h4>
                            }
                        />
                        <CardContent sx={{paddingTop : '0px'}}>
                            <Grid container direction="row">
                                <Grid item md={3}>
                                   <span className="font-normal text-xs text-gray-700">
                                       Start Date:
                                   </span>
                                </Grid>
                                <Grid item md={3}>
                                   <span className="font-normal text-xs text-gray-700">
                                       End Date:
                                   </span>
                                </Grid>
                                <Grid item md={3}>
                                   <span className="font-normal text-xs text-gray-700">
                                      Total Members:
                                   </span>
                                </Grid>
                                <Grid item md={3}>
                                   <span className="font-normal text-xs text-gray-700">
                                      Status:
                                   </span>
                                </Grid>
                            </Grid>
                            <Typography variant="body2" component="p">
                                Project details
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default ProjectDetails;