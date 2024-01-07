import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from '@/lib/styeldComponent/SearchField';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import {projectsService} from '@/services/api/projects/projects.service';
import ProjectShow from '@/components/Project/ProjectShow';
import ProjectAddUpdate from '@/components/Project/ProjectAddUpdate';
import AddProjectCard from '@/components/Project/ProjectAdd';
import Breadcrumb from '@/components/Global/Breadcrumb';
const Project: React.FC = () => {
    const [open, setOpen] = useState(false);

    let breadcrumbs = [
        {
            url : '',
            label : 'Projects',
        }
    ];

    useEffect(() => {
        projectsService.get().then(res => {});
    }, []);
    const projects = useSelector((state: RootState) => state.projects.projects);

    const clickDialog = () => {
        setOpen(!open);
    };
    return (
        <>
            <Breadcrumb data={breadcrumbs}/>
            <Grid container direction="row" justifyContent="space-between">
                <Grid item md={6}>

                </Grid>
                <Grid item md={6}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                spacing={3}
                sx={{
                    marginTop: '30px',
                }}
            >
                {projects.map((project, i) => (
                    <Grid item md={3} key={i}>
                        <ProjectShow clickDialog={clickDialog} project={project} />
                    </Grid>
                ))}

                <Grid item md={3}>
                    <AddProjectCard/>
                </Grid>
            </Grid>
            <ProjectAddUpdate/>
        </>
    );
};

export default Project;
