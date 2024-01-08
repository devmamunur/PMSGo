import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CalendarMonth } from '@mui/icons-material';

const ProjectStatisticsCard = () => {
  return (
    <>
      <Grid container direction="row" columnSpacing={3}>
        <Grid item md={3}>
          <Card className="mb-6" elevation={2}>
            <CardContent className="flex justify-between items-center">
              <div>
                <CalendarMonth />
              </div>
              <div className="text-right">
                <p className="font-normal text-md text-gray-700">Days left</p>
                <h6 className="font-normal text-md text-gray-900 font-bold">
                  -100
                </h6>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card className="mb-6" elevation={2}>
            <CardContent className="flex justify-between items-center">
              <div>
                <CalendarMonth />
              </div>
              <div className="text-right">
                <p className="font-normal text-md text-gray-700">Budget</p>
                <h6 className="font-normal text-md text-gray-900 font-bold">
                  $10,000
                </h6>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card className="mb-6" elevation={2}>
            <CardContent className="flex justify-between items-center">
              <div>
                <CalendarMonth />
              </div>
              <div className="text-right">
                <p className="font-normal text-md text-gray-700">Total Task</p>
                <h6 className="font-normal text-md text-gray-900 font-bold">
                  21
                </h6>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card className="mb-6" elevation={2}>
            <CardContent className="flex justify-between items-center">
              <div>
                <CalendarMonth />
              </div>
              <div className="text-right">
                <p className="font-normal text-md text-gray-700">No Idea</p>
                <h6 className="font-normal text-md text-gray-900 font-bold">
                  000
                </h6>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectStatisticsCard;
