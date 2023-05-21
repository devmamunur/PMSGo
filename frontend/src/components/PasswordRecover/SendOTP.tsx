"use client"
import React, {Fragment, useRef} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import FormHelper from "@/helpers/form.helper";
import ToastHelper from "@/helpers/toast.helper";
import {redirect} from "next/navigation";
import UserRequest from "@/APIRequests/user.request";

const SendOTP : React.FC = () => {
    let emailRef=useRef<HTMLInputElement>(null);
    const handleSubmit=(event : React.FormEvent)=>{
        event.preventDefault();

        let email=emailRef.current!.value;

        if(FormHelper.isEmail(email)){
            ToastHelper.errorToast("Valid Email Address Required !")
        }
        else{
            UserRequest.recoverVerifyEmailRequest(email).then((result : boolean)=>{
                if(result){
                    redirect("/verify-otp")
                }
            })
        }
    }
    return (
        <>
            <Grid  container direction="row" justifyContent="center" alignItems="center" sx={{paddingTop : '50px'}} >
                <Grid item xs={10} md={3}>
                    <Box sx={{textAlign : 'center'}}>
                        <Typography component="h1" variant="h4">
                            Enter Your Email Address
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
            </Grid >
        </>
    );
};

export default SendOTP;