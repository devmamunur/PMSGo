'use client';
import React, {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import {projectsService} from '@/services/api/projects/projects.service';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store/store';
import Breadcrumb from '@/components/Global/Breadcrumb';
import ProjectInfoCard from '@/components/Project/Details/ProjectInfoCard';
import ProjectStatisticsCard from '@/components/Project/Details/ProjectStatisticsCard';
import ProjectTeamCard from '@/components/Project/Details/ProjectTeamCard';
import ProjectClientCard from '@/components/Project/Details/ProjectClientCard';
import ProjectMilestoneTable from '@/components/Project/Details/ProjectMilestoneTable';
import ProjectFileCard from '@/components/Project/Details/ProjectFileCard';


const ProjectDetails = () => {
    const params = useParams();
    const projectId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const open = Boolean(anchorEl);

    let breadcrumbs = [
        {
            url : '/projects',
            label : 'Projects',
        },
        {
            url : '',
            label : 'Project Details',
        }
    ];

    useEffect(() => {
        if (projectId) {
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
    const handleEdit = (id: any) => {
        setOpenDialog(true);
    }

    return (
        <>
            <Breadcrumb data={breadcrumbs}/>
            <Grid container direction="row" columnSpacing={3}>
                <Grid item md={8}>
                    <ProjectInfoCard project={project}/>
                    <ProjectStatisticsCard/>
                    <Grid container direction="row" columnSpacing={3} className="mb-4">
                        <Grid item md={6}>
                            <ProjectTeamCard/>
                        </Grid>
                        <Grid item md={6}>
                            <ProjectClientCard/>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" columnSpacing={3}>
                        <Grid item md={12}>
                            <Card elevation={2}>
                                <CardContent>
                                    <ProjectMilestoneTable/>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={4}>
                    <ProjectFileCard/>
                </Grid>
            </Grid>

        </>
    );
};

export default ProjectDetails;