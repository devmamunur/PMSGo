import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {Search, SearchIconWrapper, StyledInputBase} from "@/styeldComponent/SearchField";
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import {taskListByStatus} from "@/APIRequest/APIRequest";
import {useSelector} from "react-redux";
import {DeleteToDO} from "@/helper/DeleteAlert";
import {UpdateTask} from "@/helper/UpdateAlert";
import TaskCard from "@/components/TaskCard/TaskCard";


const New = () => {

    useEffect(() => {
        taskListByStatus('New');
    }, [])

    const taskNew = useSelector((state) => state.task.New);

    const handelDeleteItem = (id) => {
       DeleteToDO(id).then((result) => {
           if(result === true){
               taskListByStatus('New');
           }
       });
    }
    const handelUpdateItem = (id, status) => {
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
                            <TaskCard UpdateItem={handelUpdateItem} DeleteItem={handelDeleteItem} task={task}/>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
};

export default New;