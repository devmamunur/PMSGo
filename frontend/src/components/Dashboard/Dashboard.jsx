import React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Dashboard = () => {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        Chart Here test update change text
                        Chart Here test update change text
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        Deposit
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        Order
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;