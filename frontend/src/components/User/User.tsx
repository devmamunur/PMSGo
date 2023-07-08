import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Search, SearchIconWrapper, StyledInputBase} from '@/styeldComponent/SearchField';
import SearchIcon from '@mui/icons-material/Search';
import TaskCard from '@/components/TaskCard/TaskCard';
import AddUserCard from '@/components/User/AddUserCard';
import AddUserDialog from '@/components/User/AddUserDialog';
import Button from '@mui/material/Button';

const User : React.FC = () => {
    const [open, setOpen] = useState(false);
    const clickDialog = () => {
        setOpen(!open);
    };
    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
            >
                <Grid item md={6}>
                    <Typography variant="h5" sx={{
                        fontWeight: '700 !important'
                    }}>
                        Users
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
            <Grid  container
                   direction="row"
                   spacing={3}
                   sx={{
                       marginTop : '30px'
                   }}
            >

                <Grid item md={3}  >
                    <AddUserCard clickDialog={clickDialog}/>
                </Grid>

            </Grid>
            <AddUserDialog clickDialog={clickDialog} open={open}/>
        </>
    );
};

export default User;