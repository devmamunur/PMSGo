"use client"
import React, {ChangeEvent, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card, CardContent, FormControl, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {LoadingButton} from '@mui/lab';
import FormHelper from "@/helpers/form.helper";
import ToastHelper from "@/helpers/toast.helper";
import NextLink from "next/link";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Login} from "@mui/icons-material";
import InputLabel from '@mui/material/InputLabel';
import {authService} from '@/services/api/auth/auth.service';
import {AxiosError} from 'axios';
import {ErrorResponse} from '@/interfaces/common';


const SignIn: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [type, setType] = useState<string>("company");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (FormHelper.isType(type)) {
            ToastHelper.errorToast("User type not valid!")
        } else if (FormHelper.isEmail(email)) {
            ToastHelper.errorToast("Valid email address required !")
        } else if (FormHelper.isEmpty(password)) {
            ToastHelper.errorToast("Password required !")
        } else {
            setLoading(true);
            const result = await signIn('credentials', {
                type,
                email,
                password,
                redirect: false,
            });
            if (result!.ok) {
                console.log(result);
                setLoading(false);
                ToastHelper.successToast("Successfully signIn")
                router.push('/dashboard');
            } else {
                console.log(result);
                setLoading(false);
                ToastHelper.errorToast('Email or password not match');
            }
            // try {
            //     setLoading(true);
            //     const result = await authService.signin({type, email, password});
            //     setLoading(false);
            //     ToastHelper.successToast(result.data.message);
            //     router.push('/dashboard');
            // } catch (error) {
            //     const axiosError = error as AxiosError<ErrorResponse>;
            //     setLoading(false);
            //     ToastHelper.errorToast(axiosError?.response?.data?.error);
            // }
        }
    }

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
                                <Typography component="h1" variant="h5" sx={{fontWeight: 600, marginBottom: '25px'}}>
                                    Sign In
                                </Typography>
                            </Box>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-autowidth-label">Sign In As</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        required
                                        fullWidth
                                        value={type}
                                        label="Sign In As"
                                        onChange={(event: SelectChangeEvent) => setType(event.target.value)}
                                    >
                                        <MenuItem value='admin'>Admin</MenuItem>
                                        <MenuItem value='company'>Company</MenuItem>
                                        <MenuItem value='client'>Client</MenuItem>
                                        <MenuItem value='user'>User</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                                />
                                <LoadingButton
                                    type="submit"
                                    fullWidth
                                    loading={loading}
                                    variant="contained"
                                    sx={{mt: 3, mb: 5}}
                                    endIcon={<Login/>}
                                    loadingPosition="end"
                                >
                                    <span>Sign In</span>
                                </LoadingButton>
                                <Grid container>
                                    <Grid item xs>
                                        <NextLink href="/send-otp">
                                            Forgot password?
                                        </NextLink>
                                    </Grid>
                                    <Grid item>
                                        <NextLink href="/register">
                                            {"Don't have an account? Sign Up"}
                                        </NextLink>
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

export default SignIn;