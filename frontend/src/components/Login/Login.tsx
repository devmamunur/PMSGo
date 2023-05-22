import React, {useRef} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import FormHelper from "@/helpers/form.helper";
import ToastHelper from "@/helpers/toast.helper";
import UserRequest from "@/APIRequests/user.request";
import Link from "next/link";

const Login : React.FC = () => {


    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let email = emailRef.current!.value;
        let password = passwordRef.current!.value;

        if(FormHelper.isEmail(email)){
            ToastHelper.errorToast("Valid Email Address Required !")
        }
        else if(FormHelper.isEmpty(password)){
            ToastHelper.errorToast("Password Required !")
        }else {
            UserRequest.loginRequest(email, password).then((result : boolean) => {
                if(result) {
                    window.location.href="/"
                }
            });
        }
    };

    return (
        <>
            <Grid  container direction="row" justifyContent="center" alignItems="center" sx={{paddingTop : '50px'}} >
                <Grid item xs={10} md={3}>
                    <Box sx={{textAlign : 'center'}}>
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
                                <Link href="/send-otp" >
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
                </Grid>
            </Grid >
        </>
    );
};

export default Login;