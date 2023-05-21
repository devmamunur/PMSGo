"use client"
import React, { useRef } from 'react';
import { TextField, Typography, Box, Button, Grid } from '@mui/material';
import Link from 'next/link';
import FormHelper from '@/helpers/form.helper';
import UserRequest from "@/APIRequests/user.request";
import {redirect} from "next/navigation";
import ToastHelper from "@/helpers/toast.helper";


const Registration: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const mobileRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email : string = emailRef.current!.value;
        const firstName  = firstNameRef.current!.value;
        const lastName  = lastNameRef.current!.value;
        const mobile  = mobileRef.current!.value;
        const password  = passwordRef.current!.value;
        const photo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAADlAAAA5QGP5Zs8AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAelQTFRF////JG2SQICAJ05iM1VVNXWAM3CFKUtRM3GCJkdRNHCBJkNNJ0BIMnCAM3GAMnCAJDtBNHKAM3GAIzU5IzY7M3GAM3GAKk1WIi8yM3GAISwwM3GAM3GAICgrHyYoHiIjIiUoFBQUFRUUFhUVFhYWFxYWGRkYHBoYHR0eHR4fHh4fHiEiHiEjHx8gIi8zIjE1IjI2Ix4bIyMlIzU6JCAdJCIgJDY8JyIfJ0VNKEZNKSksKSktKTg5LCciLSsnLychL2JvL2VyMGNvMGVzMGZzMGl2MWp4MWt5MWx6Mm17Mm99MyojMzM5M2BpM3B/M3GANXKAN3KAOGx4OjUvO3SAPXSAPjw2Pj45PmVqPz9HP2ZsQF9iQ0VMQ0VNRUVNRUVORkQ9RkZPR1BMSEhRSUlTSkpUU0EzVldfV1dfWU1AXEc3XE9CXn+AXoCAX2l1YGl2Y4KBZk48a1I/b4J+co2iepOVe3uBe5OVgI+Xh46BjGlPjrDHkm5SmXJVnr/Tn7/TocDUo73Npr/PqcPUqq61r4JgsINhsbK1tMjVxZ98xaOCyKF+0aaB1NbY1qmC2ZRk2qB126J23KJ24KyC4qN55Kh65Onu5Oru5qZ75rWV6qh37Kx+7eLc7qx8769/8bGB8vn+87KB9LOCwa3cagAAACF0Uk5TAAcIDQ8YGSwtL0lQfISXmL/ByNXV2uPu7/Lz8/X5/P7+cDzfRAAAAfxJREFUGBllwYk/FFEcAPDfDrsYZtYsu6wZx+t8uSrddEh3aX8Ula5NTCelSESlKBKr0uEs3l/azHvP7O7H9wtJPjVohE0zbARVH2wW0KPoieoBSKdoFqaxNAVS+EMonb+AUsgPnuwIclfuHSJbjl27jFwkGyR/BLkb+wm3/SZyET9wSgiFq0Q6cAa5kAIuDYVbRNh5iRxFQQNHwELhPnGdePNrlGy7iJwVAAAdpeuEbH3w6R9jnwk5iYIO4IuidJy8/MZcf/fuQCnqAxWltsdPmPTiaRtKKgRR6vs6yqS3X/pQCoKBUm/iO5N+JHpRMiCMUmuCeRKtKIXBxA0980ya78ENJpjoGWZsfXV1nbFh9JgQRk/LNFuam1ti0y3oCYOBSe0zzDHTjkkGBDFF/8Ly8kI/pgiCiile/3S8whQq+KIoxZqG1lYWF1fWhppiKEV9ADq6Th3eXV1jT/weG/szYddU7zlyGl06AAQsxLP7qCveNfvh42xXnDp2HTyHaAXAoWGslnId9uTU1KTdQbnaGGrgUkKNVKjvHBwfH+ysp0JjSAHOX0SFuu6H794/6q6jQpEfpNwyKjTbIyN2MxXKcsGTVUK5yrsDA/FKypVkQYrM/Crqanj2vIG6qvIzIV1OQTl13L5DHeUFObBZRl5hcWlFRWlxYV4GeP4Dm5L5s3KTpvYAAAAASUVORK5CYII=";

        if (FormHelper.isEmail(email)) {
            alert("Hello Mamun email");
            ToastHelper.errorToast('Valid Email Address Required!');
        } else if (FormHelper.isEmpty(firstName)) {
            ToastHelper.errorToast('First Name Required!');
        } else if (FormHelper.isEmpty(lastName)) {
            ToastHelper.errorToast('Last Name Required!');
        } else if (!FormHelper.isMobile(mobile)) {
            ToastHelper.errorToast('Valid Mobile Required!');
        } else if (FormHelper.isEmpty(password)) {
            ToastHelper.errorToast('Password Required!');
        } else {
            UserRequest.registrationRequest(email, firstName, lastName, mobile, password, photo).then((result : boolean) => {
                if (result) {
                    redirect('/login');
                }
            });
        }
    };

    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ paddingTop: '50px' }}>
                <Grid item xs={10} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography component="h1" variant="h4">
                            Sign Up
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" fullWidth label="Email Address" type="email" inputRef={emailRef} />
                        <TextField margin="normal" fullWidth label="First Name" inputRef={firstNameRef} />
                        <TextField margin="normal" fullWidth label="Last Name" inputRef={lastNameRef} />
                        <TextField margin="normal" fullWidth label="Mobile" type="number" inputRef={mobileRef} />
                        <TextField margin="normal" fullWidth label="Password" type="password" inputRef={passwordRef} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/" >
                                    <Typography variant="body2">Forgot password?</Typography>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/" >
                                    <Typography variant="body2">Already have an account? Sign In</Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Registration;