"use client"
import React, {useRef} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {redirect} from "next/navigation";
import UserRequest from "@/APIRequests/user.request";
import SessionHelper from "@/helpers/session.helper";
import ToastHelper from "@/helpers/toast.helper";
import FormHelper from "@/helpers/form.helper";

const CreatePassword: React.FC = () => {

    const PasswordRef = useRef<HTMLInputElement>(null);
    const ConfirmPasswordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        let Password = PasswordRef.current!.value;
        let ConfirmPassword = ConfirmPasswordRef.current!.value;

        if (FormHelper.isEmpty(Password)) {
            ToastHelper.errorToast("Password Required")
        } else if (FormHelper.isEmpty(ConfirmPassword)) {
            ToastHelper.errorToast("Confirm Password Required")
        } else if (Password !== ConfirmPassword) {
            ToastHelper.errorToast("Password & Confirm Password Should be Same")
        } else {
            const email = SessionHelper.getEmail();
            const otp = SessionHelper.getOTP();

            if (email !== null && otp !== null) {
                UserRequest.recoverResetPassRequest(email, otp, Password).then((result: boolean) => {
                    if (result) {
                        redirect("/login")
                    }
                })
            }else {
                ToastHelper.errorToast("Password Recover Failed!")
            }
        }
    }

    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" sx={{paddingTop: '50px'}}>
                <Grid item xs={10} md={3}>
                    <Box sx={{textAlign: 'center'}}>
                        <Typography component="h1" variant="h4">
                            Set New Password
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 5, textAlign: 'center'}}>
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
                            inputRef={PasswordRef}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            inputRef={ConfirmPasswordRef}
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
export default CreatePassword;