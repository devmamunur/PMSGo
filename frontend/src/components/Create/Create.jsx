import React, {useRef} from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {ErrorToast, IsEmpty} from "../../helper/FormHelper.ts";
import {NewTaskRequest} from "../../APIRequest/APIRequest.ts";
import {useNavigate} from "react-router-dom";

const Create = () => {
    let navigate=useNavigate();
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        let title = titleRef.current.value;
        let description = descriptionRef.current.value;

        if(IsEmpty(title)){
            ErrorToast("Title Required")
        }
        else if(IsEmpty(description)){
            ErrorToast("Description Required")
        }
        else {
            NewTaskRequest(title,description).then((res)=>{
                if(res===true){
                    navigate("/new-task")
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
                                    <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
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