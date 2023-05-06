import React from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Search, SearchIconWrapper, StyledInputBase} from "../../styeldComponent/SearchField.js";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import {Delete, Edit} from "@mui/icons-material";
import Button from "@mui/material/Button";

const Canceled = () => {
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
                        Canceled Task
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
                   sx={{
                       marginTop : '30px'
                   }}
            >
                <Grid item md={4}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{
                                marginBottom : '10px'
                            }}>
                                <strong>Title</strong>
                            </Typography>
                            <Typography variant="body2">
                                Description
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Grid item>
                                    <Typography variant="caption" sx={{marginRight : '10px'}}>
                                        today date
                                    </Typography>
                                    <IconButton size="small">
                                        <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small">
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Button size="small" variant="contained" color="primary">new</Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default Canceled;