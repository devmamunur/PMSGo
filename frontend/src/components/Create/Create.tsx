"use client"
import React, {useRef} from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useRouter} from "next/navigation";
import TaskRequest from "@/APIRequests/task.request";
import FormHelper from "@/helpers/form.helper";
import ToastHelper from "@/helpers/toast.helper";


const Create : React.FC = () => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let title = titleRef.current!.value;
        let description = descriptionRef.current!.value;

        if(FormHelper.isEmpty(title)){
            ToastHelper.errorToast("Title Required")
        }
        else if(FormHelper.isEmpty(description)){
            ToastHelper.errorToast("Description Required")
        }
        else {
            TaskRequest.newTask(title,description).then((res : boolean)=>{
                if(res){
                    router.push("/dashboard/new-task")
                }
            })
        }

    }

    return (
        <>
            <Grid  container
                   direction="row"
                   justifyContent="center"
                   sx={{
                       marginTop : '30px'
                   }}
            >
                <Grid item md={6}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent component="form" onSubmit={handleSubmit}>
                            <Typography variant="h6" sx={{
                                marginBottom : '10px'
                            }}>
                                <strong>Create New</strong>
                            </Typography>
                            <Typography component="div">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Task Name"
                                    inputRef={titleRef}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    required
                                    label="Task Description"
                                    multiline
                                    rows={4}
                                    inputRef={descriptionRef}
                                />
                            </Typography>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                sx={{
                                    marginTop : '15px'
                                }}
                            >
                                <Grid item>
                                </Grid>
                                <Grid item>
                                    <Button type="submit" variant="contained" color="primary">Save</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default Create;