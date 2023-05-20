import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {summaryRequest} from "../../APIRequest/APIRequest.ts";
import {useSelector} from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
    const summaryList = useSelector((state) => state.summary.value);
    useEffect(() => {
        summaryRequest();
    }, [])
    return (
        <>
            <Grid container spacing={3} sx={{
                marginTop: '30px'
            }}>
                {
                    summaryList.map((item, i) => (
                        <Grid item xs={6} md={4} key={i}>
                            <Card>
                                <CardContent sx={{textAlign : 'center'}}>
                                    <Typography variant="h6" sx={{
                                        marginBottom: '10px',
                                        fontWeight: '600'
                                    }}>
                                        {item._id} Task
                                    </Typography>
                                    <Typography variant="h4">
                                        {item.sum}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
};

export default Dashboard;