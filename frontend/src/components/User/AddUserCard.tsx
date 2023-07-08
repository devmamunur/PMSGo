import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


const AddUserCard : React.FC  = () => {
    return (
        <div>
            <Card elevation={2} >
                <CardContent sx={{
                    textAlign: "center"
                }}>
                    <Typography color="text.secondary" component="p">
                       <ControlPointIcon sx={{ fontSize: "54px" }}/>
                    </Typography>
                    <Typography variant="h5" component="h4">
                       Add new user
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddUserCard;