"use client"
import React, {ChangeEvent, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card, CardContent, TextField} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import FormHelper from "@/helpers/form.helper";
import ToastHelper from "@/helpers/toast.helper";
import {useRouter} from "next/navigation";
import UserRequest from "@/APIRequests/user.request";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const SendOTP : React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        if(FormHelper.isEmail(email)){
            ToastHelper.errorToast("Valid Email Address Required !")
        }
        else{
            setLoading(true);
            await UserRequest.recoverVerifyEmailRequest(email).then((result : boolean)=>{
                setLoading(false);
                if(result){
                    router.push("/verify-otp")
                }
            })
        }
    }
    return (
        <>
            <Grid  container justifyContent="center" alignItems="center" sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }} >
                <Grid item xs={10} xl={4}>
                    <Card>
                        <CardContent>
                            <Box sx={{textAlign : 'center'}}>
                                <Typography component="h1" variant="h5" sx={{fontWeight : 600, marginBottom : '25px'}}>
                                    Enter Your Email
                                </Typography>
                            </Box>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                                />
                                <LoadingButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    endIcon={<KeyboardArrowRightIcon />}
                                    loading={loading}
                                    loadingPosition="end"
                                >
                                    <span>Next</span>
                                </LoadingButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid >
        </>
    );
};

export default SendOTP;