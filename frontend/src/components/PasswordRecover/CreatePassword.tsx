import React, {Fragment, useRef} from 'react';
import {ErrorToast, IsEmpty} from "../../helper/FormHelper";
import {RecoverResetPassRequest} from "../../APIRequest/APIRequest";
import {getEmail, getOTP} from "../../helper/SessionHelper";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
const CreatePassword = () => {

    const  PasswordRef = useRef();
    const  ConfirmPasswordRef = useRef();

    let navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let Password = PasswordRef.current.value;
        let ConfirmPassword =  ConfirmPasswordRef.current.value;
        if(IsEmpty(Password)){
            ErrorToast("Password Required")
        }
        else if(IsEmpty(ConfirmPassword)){
            ErrorToast("Confirm Password Required")
        }
        else if(Password!==ConfirmPassword){
            ErrorToast("Password & Confirm Password Should be Same")
        }
        else{
            RecoverResetPassRequest(getEmail(),getOTP(),Password).then((result)=>{
                if(result===true){
                    navigate("/login")
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
                            Set New Password
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 5, textAlign : 'center'}}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Your Email"
                            type="email"
                            defaultValue={getEmail()}
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
            </Grid >
        </>
    );
};
export default CreatePassword;