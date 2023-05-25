"use client"
import React, {useRef} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card, CardContent, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import FormHelper from "@/helpers/form.helper";
import ToastHelper from "@/helpers/toast.helper";
import Link from "next/link";
import {signIn} from "next-auth/react";

const Login: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let email = emailRef.current!.value;
        let password = passwordRef.current!.value;

        if (FormHelper.isEmail(email)) {
            ToastHelper.errorToast("Valid Email Address Required !")
        } else if (FormHelper.isEmpty(password)) {
            ToastHelper.errorToast("Password Required !")
        } else {
           signIn('credentials', {
                email,
                password,
                callbackUrl: '/dashboard',
            }).then((res : any) => {
                alert('success : ');
                console.log('login success');
            }).catch((error) => {
                console.log('login failed');
            });
        }
    };

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}>
                <Grid item xs={10} xl={4}>
                    <Card>
                        <CardContent>
                            <Box sx={{textAlign: 'center'}}>
                                <Typography component="h1" variant="h4">
                                    Sign In
                                </Typography>
                            </Box>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    inputRef={emailRef}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    inputRef={passwordRef}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="/send-otp">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default Login;