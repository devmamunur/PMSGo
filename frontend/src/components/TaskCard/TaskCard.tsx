import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import {CalendarMonth, Delete, Edit} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {TaskCardProps} from "@/interfaces/task.interface";

const TaskCard : React.FC<TaskCardProps> = ({task, UpdateItem, DeleteItem}) => {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{
                        marginBottom : '10px',
                        fontWeight : '600'
                    }}>
                        {task.title}
                    </Typography>
                    <Typography variant="subtitle2">
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
                            <Typography variant="subtitle2" >
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
        </>
    );
};

export default TaskCard;