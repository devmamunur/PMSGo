import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Card from '@mui/material/Card';
import {Avatar} from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const ShowUserCard : React.FC = ({user}) => {
    return (
        <>
            <Card elevation={2}>
                <CardContent sx={{
                    textAlign: "center"
                }}>
                    <Typography component="div" sx={{display : 'flex', justifyContent : 'center', marginBottom : '20px'}}>
                        <Avatar sx={{ bgcolor: deepPurple[500],  width: 80, height: 80 }}>{user.name.substring(0, 2)}</Avatar>
                    </Typography>
                    <Typography variant="h5" component="h4">
                        {user.name}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default ShowUserCard;