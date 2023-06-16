"use client"
import React, {useState, ChangeEvent} from 'react';
import {TextField, Typography, Box, Grid, Card, CardContent} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import FormHelper from '@/helpers/form.helper';
import {useRouter} from "next/navigation";
import ToastHelper from "@/helpers/toast.helper";
import 'react-phone-input-2/lib/material.css';
import NextLink from "next/link";
import {LockOpen} from "@mui/icons-material";
import {authService} from '@/services/api/auth/auth.service';
import {AxiosError} from 'axios';
import {ErrorResponse} from '@/interfaces/common';


const SignUp: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [workspaceName, setWorkspaceName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (FormHelper.isEmpty(name)) {
            ToastHelper.errorToast('Name required!');
        } else if (FormHelper.isEmail(email)) {
            ToastHelper.errorToast('Valid email address required!');
        } else if (FormHelper.isEmpty(workspaceName)) {
            ToastHelper.errorToast('Workspace name required!');
        } else if (FormHelper.isEmpty(password)) {
            ToastHelper.errorToast('Password required!');
        } else if (password !== confirmPassword) {
            ToastHelper.errorToast('Confirm password not matched!');
        } else {
            try {
                setLoading(true);
                const result = await authService.signup({name, email, workspace_name: workspaceName, password});
                setLoading(false);
                ToastHelper.successToast(result.data.message);
                router.push("/login");
            } catch (error) {
                const axiosError = error as AxiosError<ErrorResponse>;
                setLoading(false);
                ToastHelper.errorToast(axiosError?.response?.data?.error);
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
                                <Typography component="h1" variant="h5" sx={{fontWeight: 600, marginBottom: '25px'}}>
                                    Sign Up
                                </Typography>
                            </Box>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                                <TextField margin="normal" fullWidth label="Full Name"
                                           onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}/>
                                <TextField margin="normal" fullWidth label="Email Address" type="email"
                                           onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>
                                <TextField margin="normal" fullWidth label="Workspace Name"
                                           onChange={(event: ChangeEvent<HTMLInputElement>) => setWorkspaceName(event.target.value)}/>
                                <TextField margin="normal" fullWidth label="Password" type="password"
                                           onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>
                                <TextField margin="normal" fullWidth label="Confirm Password" type="password"
                                           onChange={(event: ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)}/>
                                <LoadingButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 5}}
                                    loading={loading}
                                    endIcon={<LockOpen/>}
                                    loadingPosition="end"
                                >
                                    <span>Sign Up</span>
                                </LoadingButton>
                                <Grid container>
                                    <Grid item xs>
                                        <NextLink href="/">
                                            <Typography variant="body2">Forgot password?</Typography>
                                        </NextLink>
                                    </Grid>
                                    <Grid item>
                                        <NextLink href="/login">
                                            <Typography variant="body2">Already have an account? Sign In</Typography>
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

export default SignUp;