'use client';
import React, { ChangeEvent, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, CardContent, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import UserRequest from '@/APIRequests/user.request';
import SessionHelper from '@/helpers/session.helper';
import ToastHelper from '@/helpers/toast.helper';
import FormHelper from '@/helpers/form.helper';
import { LoadingButton } from '@mui/lab';
import { Send } from '@mui/icons-material';

const CreatePassword: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (FormHelper.isEmpty(password)) {
      ToastHelper.errorToast('Password Required');
    } else if (FormHelper.isEmpty(confirmPassword)) {
      ToastHelper.errorToast('Confirm Password Required');
    } else if (password !== confirmPassword) {
      ToastHelper.errorToast('Password & Confirm Password Should be Same');
    } else {
      const email = SessionHelper.getEmail();
      const otp = SessionHelper.getOTP();

      if (email !== null && otp !== null) {
        setLoading(true);
        await UserRequest.recoverResetPassRequest(email, otp, password).then(
          (result: boolean) => {
            setLoading(false);
            if (result) {
              router.push('/login');
            }
          }
        );
      } else {
        ToastHelper.errorToast('Password Recover Failed!');
      }
    }
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Grid item xs={10} xl={4}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ fontWeight: 600, marginBottom: '25px' }}
                >
                  Set New Password
                </Typography>
              </Box>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 5, textAlign: 'center' }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  label="Your Email"
                  type="email"
                  defaultValue={SessionHelper.getEmail()}
                  disabled
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="New Password"
                  type="password"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(event.target.value)
                  }
                />
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  endIcon={<Send />}
                  loading={loading}
                  loadingPosition="end"
                >
                  <span>Submit</span>
                </LoadingButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default CreatePassword;
