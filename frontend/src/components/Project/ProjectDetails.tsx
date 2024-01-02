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
import Card from '@mui/material/Card';
import {projectsService} from '@/services/api/projects/projects.service';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store/store';
import {AddBox, CalendarMonth, Delete, Lock} from '@mui/icons-material';
import Image from 'next/image';

const ProjectDetails = () => {
    const params   = useParams();
    const projectId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const open = Boolean(anchorEl);


    useEffect(() => {
        if(projectId){
            projectsService.getSingle(projectId.toString());
        }
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
            <Grid container direction="row" columnSpacing={3}>
                <Grid item md={8}>
                    <Card elevation={2} className='mb-5'>
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
                              <h4 className="text-2xl font-medium">{project.name}</h4>
                            }
                        />
                        <CardContent sx={{paddingTop : '0px'}}>
                            <Grid container direction="row" className="pb-3">
                                <Grid item md={3}>
                                   <span className="font-normal text-xs text-gray-700">
                                       Start Date:
                                   </span>
                                    <p>
                                        {project.start_date}
                                    </p>
                                </Grid>
                                <Grid item md={3}>
                                   <span className="font-normal text-xs text-gray-700">
                                       End Date:
                                   </span>
                                    <p>
                                        {project.end_date}
                                    </p>
                                </Grid>
                                <Grid item md={3}>
                                   <span className="font-normal text-xs text-gray-700">
                                      Status:
                                   </span>
                                    <p>
                                        {project.status}
                                    </p>
                                </Grid>
                            </Grid>
                            <Typography variant="body2" component="p">
                                 <span className="font-normal text-xs text-gray-700">
                                      Details:
                                   </span> <br/>
                                Project details
                            </Typography>
                        </CardContent>
                    </Card>
                    <Grid container direction="row" columnSpacing={3}>
                        <Grid item md={3}>
                            <Card className='mb-5' elevation={2}>
                                <CardContent className='flex justify-between items-center'>
                                    <div>
                                        <CalendarMonth/>
                                    </div>
                                    <div className='text-right'>
                                        <p className="font-normal text-md text-gray-700">
                                            Days left
                                        </p>
                                        <h6 className="font-normal text-md text-gray-900 font-bold">
                                            -100
                                        </h6>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={3}>
                            <Card className='mb-5' elevation={2}>
                                <CardContent className='flex justify-between items-center'>
                                    <div>
                                        <CalendarMonth/>
                                    </div>
                                    <div className='text-right'>
                                        <p className="font-normal text-md text-gray-700">
                                            Budget
                                        </p>
                                        <h6 className="font-normal text-md text-gray-900 font-bold">
                                            $10,000
                                        </h6>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={3}>
                            <Card className='mb-5' elevation={2}>
                                <CardContent className='flex justify-between items-center'>
                                    <div>
                                        <CalendarMonth/>
                                    </div>
                                    <div className='text-right'>
                                        <p className="font-normal text-md text-gray-700">
                                            Total Task
                                        </p>
                                        <h6 className="font-normal text-md text-gray-900 font-bold">
                                            21
                                        </h6>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={3}>
                            <Card className='mb-5' elevation={2}>
                                <CardContent className='flex justify-between items-center'>
                                    <div>
                                        <CalendarMonth/>
                                    </div>
                                    <div className='text-right'>
                                        <p className="font-normal text-md text-gray-700">
                                            No Idea
                                        </p>
                                        <h6 className="font-normal text-md text-gray-900 font-bold">
                                            000
                                        </h6>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" columnSpacing={3}>
                        <Grid item md={6}>
                            <Card elevation={2}>
                                <CardHeader
                                    className="flex justify-between items-center border-b"
                                    title="Team Members (5)"
                                    titleTypographyProps={{ style: { fontSize: '16px' } }}
                                    action={
                                        <IconButton aria-label="settings">
                                            <AddBox/>
                                        </IconButton>
                                    }
                                />
                                <CardContent>
                                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                                        <div className="">
                                            <div className="flex items-center px-2">
                                                <a href="#" className=" text-start">
                                                    <Image className="fix_img" width={50} height={50} src="https://demo.rajodiya.com/taskly/storage/avatars/6329b3605f267.png" alt="kkl"/>
                                                </a>
                                                <div className="px-2">
                                                    <h5 className="m-0">Alex</h5>
                                                    <small className="text-muted">alex@example.com<span
                                                        className="text-primary "> -
                                                                    2/14</span></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Lock/>
                                            <Delete/>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="">
                                            <div className="flex items-center px-2">
                                                <a href="#" className=" text-start">
                                                    <Image className="fix_img" width={50} height={50} src="https://demo.rajodiya.com/taskly/storage/avatars/6329b3605f267.png" alt="kkl"/>
                                                </a>
                                                <div className="px-2">
                                                    <h5 className="m-0">Alex</h5>
                                                    <small className="text-muted">alex@example.com<span
                                                        className="text-primary "> -
                                                                    2/14</span></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Lock/>
                                            <Delete/>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </>
    );
};

export default ProjectDetails;