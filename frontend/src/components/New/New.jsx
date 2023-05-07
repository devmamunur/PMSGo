import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {Search, SearchIconWrapper, StyledInputBase} from "../../styeldComponent/SearchField.js";
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import {CalendarMonth, Delete, Edit} from "@mui/icons-material";
import {taskListByStatus} from "../../APIRequest/APIRequest.js";
import {useSelector} from "react-redux";
import {DeleteToDO} from "../../helper/DeleteAlert.js";
import {UpdateTask} from "../../helper/UpdateAlert.js";


const New = () => {

    useEffect(() => {
        taskListByStatus('New');
    }, [])

    const taskNew = useSelector((state) => state.task.New);

    const DeleteItem = (id) => {
       DeleteToDO(id).then((result) => {
           if(result === true){
               taskListByStatus('New');
           }
       });
    }
    const UpdateItem = (id, status) => {
        UpdateTask(id, status).then((result) => {
            if(result === true) {
                taskListByStatus('New');
            }
        })
    }
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
                        New Task
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
                {
                    taskNew.map((task, i) => (
                        <Grid item md={4}  key={i} >
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{
                                        marginBottom : '10px',
                                        fontWeight : '600'
                                    }}>
                                        {task.title}
                                    </Typography>
                                    <Typography variant="subtitle-1">
                                        {task.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Grid item>
                                            <Typography variant="subtitle-2" >
                                                <CalendarMonth sx={{marginBottom : "-4px"}} fontSize="small" /> {task.createdDate}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <IconButton size="small">
                                                <Edit onClick={UpdateItem.bind(this, task._id, task.status)} fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small">
                                                <Delete onClick={DeleteItem.bind(this, task._id)} fontSize="small" />
                                            </IconButton>
                                            <Button sx={{marginLeft : '15px'}} size="small" variant="contained" color="info">{task.status}</Button>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
};

export default New;