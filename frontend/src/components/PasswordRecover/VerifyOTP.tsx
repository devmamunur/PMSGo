"use client"
import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UserRequest from "@/APIRequests/user.request";
import {redirect} from "next/navigation";
import ToastHelper from "@/helpers/toast.helper";
import SessionHelper from "@/helpers/session.helper";
import {MuiOtpInput} from 'mui-one-time-password-input'


const VerifyOTP: React.FC = () => {

    let [OTP, SetOTP] = useState<string>("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (OTP.length === 6) {
            const email = SessionHelper.getEmail();
            if (email !== null) {
                UserRequest.recoverVerifyOTPRequest(email, OTP).then((result: boolean) => {
                    if (result) {
                        redirect("/create-password");
                    }
                });
            } else {
                ToastHelper.errorToast("OTP Verify Failed!");
            }
        } else {
            ToastHelper.errorToast("Enter 6 Digit Code");
        }
    };
    const handleOTPChange = (value: string) => {
        SetOTP(value);
    };

    // @ts-ignore
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" sx={{paddingTop: '50px'}}>
                <Grid item xs={10} md={3}>
                    <Box sx={{textAlign: 'center'}}>
                        <Typography component="h1" variant="h4">
                            OTP Verification
                        </Typography>
                        <Typography component="p" variant="body1">
                            A 6 Digit verification code has been sent to your email address.
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 5, textAlign: 'center'}}>
                        <MuiOtpInput
                            onChange={handleOTPChange}
                            length={8}
                            validateChar={(character: string, index: number) => true}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={handleSubmit}
                        >
                            Next
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default VerifyOTP;
