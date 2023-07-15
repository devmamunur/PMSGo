'use client';
import React, { SyntheticEvent } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Link from 'next/link';

const ForgetPass: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: '50px' }}
      >
        <Grid item xs={10} md={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography component="h1" variant="h4">
              Forgot Password
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Old Password"
              type="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="New Password"
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login">Back to Login Page ?</Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ForgetPass;
