import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import store from '@/redux/store/store';
import { setProjectAddDialog} from '@/redux/state-slice/ProjectSlice';

const AddUserCard: React.FC = () => {
    const addProject = () => {
        store.dispatch(setProjectAddDialog(true));
    }
  return (
      <Card sx={{height : '100%', display : 'flex', alignItems : 'center', justifyContent : 'center'}} elevation={2} onClick={addProject}>
        <CardContent
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography
            color="text.secondary"
            component="p"
            sx={{ margin: '14px 20px' }}
          >
            <ControlPointIcon sx={{ fontSize: '64px' }} />
          </Typography>
          <Typography variant="h5" component="h4">
            Add new project
          </Typography>
        </CardContent>
      </Card>
  );
};

export default AddUserCard;
