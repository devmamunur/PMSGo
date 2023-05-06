import React, {useRef} from 'react';
import {TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";
import {ErrorToast, IsEmail, IsEmpty, IsMobile} from "../../helper/FormHelper.js";

const Registration = () => {

    const emailRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const mobileRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        let email = emailRef.current.value;
        let firstName = firstNameRef.current.value;
        let lastName = lastNameRef.current.value;
        let mobile = mobileRef.current.value;
        let password = passwordRef.current.value;

        if(IsEmail(email)){
            ErrorToast("Valid Email Address Required !")
        }
        else if(IsEmpty(firstName)){
            ErrorToast("First Name Required !")
        }
        else if(IsEmpty(lastName)){
            ErrorToast("Last Name Required !")
        }
        else if(!IsMobile(mobile)){
            ErrorToast("Valid Mobile  Required !")
        }
        else if(IsEmpty(password)){
            ErrorToast("Password Required !")
        }
        else{
            // RegistrationRequest(email,fastName,lastName,mobile,password,photo).then((result)=>{
            //     if(result===true){
            //         navigate("/login")
            //     }
            // })
        }

    };
    return (
        <>
            <Grid  container direction="row" justifyContent="center" alignItems="center" sx={{paddingTop : '50px'}} >
                <Grid item xs={10} md={3}>
                    <Box sx={{textAlign : 'center'}}>
                        <Typography component="h1" variant="h4">
                            Sign Up
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email Address"
                            type="email"
                            inputRef={emailRef}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="First Name"
                            inputRef={firstNameRef}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Last Name"
                            inputRef={lastNameRef}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Mobile"
                            type="number"
                            inputRef={mobileRef}
                        />
                        <TextField
                            margin="normal"
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
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/forget-password" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid >
        </>
    );
};

export default Registration;