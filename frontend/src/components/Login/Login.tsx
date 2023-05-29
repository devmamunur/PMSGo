"use client"
import React, {ChangeEvent, useRef, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card, CardContent, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import FormHelper from "@/helpers/form.helper";
import ToastHelper from "@/helpers/toast.helper";
import Link from "next/link";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const Login: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async  (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (FormHelper.isEmail(email)) {
            ToastHelper.errorToast("Valid Email Address Required !")
        } else if (FormHelper.isEmpty(password)) {
            ToastHelper.errorToast("Password Required !")
        } else {

            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/dashboard',
            })
            if(result!.ok){
                router.push('/dashboard');
            }else {
                ToastHelper.errorToast('Email or Password Not Match');
            }
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
                                    onChange={(event : ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    onChange={(event : ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
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