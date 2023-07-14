"use client"
import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {useSelector} from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {RootState} from "@/redux/store/store";

import {useSession} from "next-auth/react";
const Dashboard = () => {
    const { data : session  } = useSession();
    useEffect(() => {
    }, [])
    return (
        <>
            <Grid container spacing={3} sx={{
                marginTop: '30px'
            }}>
                {/*{session}*/}
              {/*  {
                    summaryList.map((item : any, i : number) => (
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
                }*/}
            </Grid>
        </>
    );
};

export default Dashboard;