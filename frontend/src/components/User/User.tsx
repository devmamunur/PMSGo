import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from '@/lib/styeldComponent/SearchField';
import SearchIcon from '@mui/icons-material/Search';
import AddUserCard from '@/components/User/AddUserCard';
import AddUserDialog from '@/components/User/AddUserDialog';
import { useSession } from 'next-auth/react';
import { usersService } from '@/services/api/users/users.service';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import ShowUserCard from '@/components/User/ShowUserCard';
const User: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    usersService.get().then(res => {});
  }, []);
  const users = useSelector((state: RootState) => state.users.value);
  const clickDialog = () => {
    setOpen(!open);
  };
  return (
    <>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item md={6}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: '700 !important',
            }}
          >
            Users
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        spacing={3}
        sx={{
          marginTop: '30px',
        }}
      >
        {users.map((user, i) => (
          <Grid item md={3} key={i}>
            <ShowUserCard user={user} />
          </Grid>
        ))}

        <Grid item md={3}>
          <AddUserCard clickDialog={clickDialog} />
        </Grid>
      </Grid>
      <AddUserDialog clickDialog={clickDialog} open={open} />
    </>
  );
};

export default User;
