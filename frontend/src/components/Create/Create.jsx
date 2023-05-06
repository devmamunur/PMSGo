import React from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";

const Create = () => {
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
                        <CardContent>
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
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    required
                                    label="Task Description"
                                    multiline
                                    rows={4}
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
                                    <Button variant="contained" color="primary">Save</Button>
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