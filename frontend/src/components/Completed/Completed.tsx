import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Search, SearchIconWrapper, StyledInputBase} from "@/styeldComponent/SearchField";
import SearchIcon from "@mui/icons-material/Search";
import {useSelector} from "react-redux";
import TaskCard from "@/components/TaskCard/TaskCard";
import TaskRequest from "@/APIRequests/task.request";
import {RootState} from "@/redux/store/store";
import DeleteHelper from "@/helpers/delete.helper";

const Completed = () => {
    const taskCompleted = useSelector((state : RootState) => state.task.Completed);
     useEffect(() => {
         TaskRequest.taskListByStatus('Completed');
     }, [])
    const handelDeleteItem = (id : string) => {
        DeleteHelper.deleteToDO(id).then((result : boolean) => {
            if(result){
                TaskRequest.taskListByStatus('Completed');
            }
        });
    }
    const handelUpdateItem = (id : string, status : string) => {
        // TaskRequest.(id, status).then((result) => {
        //     if(result === true) {
        //        TaskRequest.taskListByStatus('Completed');
        //     }
        // })
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
                        Completed Task
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
                    taskCompleted.map((task : any, i : number) => (
                        <Grid item md={4}  key={i} >
                            <TaskCard UpdateItem={handelUpdateItem} DeleteItem={handelDeleteItem} task={task}/>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
};

export default Completed;