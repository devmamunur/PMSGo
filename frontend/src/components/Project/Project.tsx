import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from '@/styeldComponent/SearchField';
import SearchIcon from '@mui/icons-material/Search';
import AddUserCard from '@/components/User/AddUserCard';
import AddUserDialog from '@/components/User/AddUserDialog';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import ShowUserCard from '@/components/User/ShowUserCard';
import {projectsService} from '@/services/api/projects/projects.service';
import ShowProjectCard from '@/components/Project/ShowProjectCard';
import AddProjectCard from '@/components/Project/AddProjectCard';
import AddProjectDialog from '@/components/Project/AddProjectDialog';
const Project: React.FC = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        projectsService.get().then(res => {});
    }, []);
    const projects = useSelector((state: RootState) => state.projects.value);

    const clickDialog = () => {
        setOpen(!open);
    };
    return (
        <>
            <Grid container direction="row" justifyContent="space-between">
                <Grid item md={6}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: '700 !important',
                        }}
                    >
                        Projects
                    </Typography>
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
                        <ShowProjectCard clickDialog={clickDialog} project={project} />
                    </Grid>
                ))}

                <Grid item md={3}>
                    <AddProjectCard/>
                </Grid>
            </Grid>
            <AddProjectDialog/>
        </>
    );
};

export default Project;
