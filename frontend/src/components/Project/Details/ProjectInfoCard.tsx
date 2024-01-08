import React, { useState } from 'react';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

const ProjectInfoCard = ({ project }: { project: any }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = (id: any) => {
    setOpenDialog(true);
  };

  return (
    <>
      <Card elevation={2} className="mb-6">
        <CardHeader
          sx={{ paddingBottom: '25px' }}
          action={
            <>
              <IconButton
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => handleEdit(project.id)}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
              </Menu>
            </>
          }
          title={<h4 className="text-2xl font-medium">{project.name}</h4>}
        />
        <CardContent sx={{ paddingTop: '0px' }}>
          <Grid container direction="row" className="pb-3">
            <Grid item md={3}>
              <span className="font-normal text-xs text-gray-700">
                Start Date:
              </span>
              <p>{project.start_date}</p>
            </Grid>
            <Grid item md={3}>
              <span className="font-normal text-xs text-gray-700">
                End Date:
              </span>
              <p>{project.end_date}</p>
            </Grid>
            <Grid item md={3}>
              <span className="font-normal text-xs text-gray-700">Status:</span>
              <p>{project.status}</p>
            </Grid>
          </Grid>
          <Typography variant="body2" component="p">
            <span className="font-normal text-xs text-gray-700">Details:</span>{' '}
            <br />
            Project details
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectInfoCard;
