import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CommonHelper from '@/helpers/common.helper';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

const ShowProjectCard: React.FC<any> = ({ project }) => {
    console.log(project, "value is");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const getButtonColor = (status : string) : string => {
        switch (status){
            case 'Ongoing' :
                return 'secondary';
            case 'Finished':
                return 'success';
            case 'Hold':
                return 'warning';
            default :
                return 'primary';
        }
    }
  return (
    <>
      <Card elevation={2}>
          <CardHeader
              sx={{ paddingBottom : '0px' }}
              avatar={
                  <Avatar sx={{ bgcolor: 'purple' }} aria-label="recipe">
                      {project.name.substring(0, 2).toUpperCase()}
                  </Avatar>
              }
              action={
                  <>
                      <IconButton
                          aria-controls={open ? 'demo-positioned-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                      >
                          <MoreVertIcon />
                      </IconButton >
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
                          <MenuItem onClick={handleClose}>Edit</MenuItem>
                          <MenuItem onClick={handleClose}>Delete</MenuItem>
                      </Menu>
                  </>
              }
              title={
              <h4>{CommonHelper.showFirstNCharacters(project.name, 10)}</h4>
              }
          />
        <CardContent sx={{paddingTop : '0px'}}>
            <Typography variant="body2" component="div" sx={{display : 'flex', justifyContent : 'space-between', alignItems : 'center'}}>
                <Button
                    color={getButtonColor(project.status)}
                    size="small"
                    variant="contained"
                    disableElevation
                    sx={{
                        borderRadius : '50px',
                        padding : '1px 10px',
                        textTransform: 'initial',
                        fontSize: '12px',
                        lineHeight: '16px',
                        minWidth : 'auto'
                }}

                >
                    {project.status}
                </Button>
                <p>
                   Due Date : {CommonHelper.calculateDueDate(project.start_date, project.end_date)}
                </p>
            </Typography>
          <Typography variant="body2" component="p">
            {project.description}
          </Typography>
            <Typography sx={{ paddingTop : '10px' }} variant="button" component="p">
                Members
            </Typography>
            <AvatarGroup className="member-group-custom"  sx={{ justifyContent : 'start' }} max={4}>
            {project.assigned_users.map((user : any, i : any) =>  (
                <Avatar sx={{ bgcolor: 'blue', fontSize : '13px',  width: 27, height: 27 }} alt={user.name} src={user.avatar}  key={i} >
                    {user.name.substring(0, 2).toUpperCase()}
                </Avatar>
            ))}
            </AvatarGroup>
        </CardContent>
      </Card>
    </>
  );
};

export default ShowProjectCard;
