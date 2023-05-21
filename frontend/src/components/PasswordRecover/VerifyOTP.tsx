import React, {Fragment, useState} from 'react';
import ReactCodeInput from "react-code-input";
import {ErrorToast} from "../../helper/FormHelper";
import {RecoverVerifyOTPRequest} from "../../APIRequest/APIRequest";
import {getEmail} from "../../helper/SessionHelper";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


const VerifyOTP = () => {
    let navigate=useNavigate();

    let  defaultInputStyle= {
        fontFamily: "monospace",
        MozAppearance: "textfield",
        margin: "4px",
        paddingLeft: "8px",
        width: "45px",
        borderRadius: '3px',
        height: "45px",
        fontSize: "32px",
        border: '1px solid lightskyblue',
        boxSizing: "border-box",
        color: "black",
        backgroundColor: "white",
        borderColor: "lightgrey"
    }


    let [OTP,SetOTP]=useState("")




    const handleSubmit = (e) => {
        e.preventDefault();
        if(OTP.length===6){
            RecoverVerifyOTPRequest(getEmail(),OTP).then((result)=>{
                if(result===true){
                    navigate("/create-password")
                }
            })
        }
        else {
            ErrorToast("Enter 6 Digit Code")
        }
    }


    return (
        <>
            <Grid  container direction="row" justifyContent="center" alignItems="center" sx={{paddingTop : '50px'}} >
                <Grid item xs={10} md={3}>
                    <Box sx={{textAlign : 'center'}}>
                        <Typography component="h1" variant="h4">
                            OTP Verification
                        </Typography>
                        <Typography component="p" variant="p">
                        A 6 Digit verification code has been sent to your email address.
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 5, textAlign : 'center'}}>
                        <ReactCodeInput onChange={(value)=>SetOTP(value)} inputStyle={defaultInputStyle}  fields={6}/>
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
export default VerifyOTP;