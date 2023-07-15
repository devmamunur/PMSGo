'use client';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import UserRequest from '@/APIRequests/user.request';
import { useRouter } from 'next/navigation';
import ToastHelper from '@/helpers/toast.helper';
import SessionHelper from '@/helpers/session.helper';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Card, CardContent } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const VerifyOTP: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [OTP, setOTP] = useState<any>();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (OTP.length === 6) {
      const email = SessionHelper.getEmail();
      if (email !== null) {
        setLoading(true);
        await UserRequest.recoverVerifyOTPRequest(email, OTP).then(
          (result: boolean) => {
            setLoading(false);
            if (result) {
              router.push('/create-password');
            }
          }
        );
      } else {
        ToastHelper.errorToast('OTP Verify Failed!');
      }
    } else {
      ToastHelper.errorToast('Enter 6 Digit Code');
    }
  };
  const handleOTPChange = (value: string) => {
    setOTP(value);
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
                  OTP Verification
                </Typography>
                <Typography component="p" variant="body1">
                  A 6 Digit verification code has been sent to your email
                  address.
                </Typography>
              </Box>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 5, textAlign: 'center' }}
              >
                <MuiOtpInput
                  value={OTP}
                  onChange={handleOTPChange}
                  length={6}
                  validateChar={(character: string, index: number) => true}
                />
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  endIcon={<KeyboardArrowRightIcon />}
                  sx={{ mt: 3, mb: 2 }}
                  loading={loading}
                  loadingPosition="end"
                >
                  <span>Next</span>
                </LoadingButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default VerifyOTP;
