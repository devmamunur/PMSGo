import React, {Fragment, useRef} from 'react';
import {ErrorToast, IsEmail} from "../../helper/FormHelper";
import {RecoverVerifyEmailRequest} from "../../APIRequest/APIRequest";
import {Link, useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

const SendOTP = () => {
    let emailRef=useRef();
    let navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();

        let email=emailRef.current.value;

        if(IsEmail(email)){
            ErrorToast("Valid Email Address Required !")
        }
        else{
            RecoverVerifyEmailRequest(email).then((result)=>{
                if(result===true){
                    navigate("/verify-otp")
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