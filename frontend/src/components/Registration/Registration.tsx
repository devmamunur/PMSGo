"use client"
import React, {useState, ChangeEvent} from 'react';
import {TextField, Typography, Box, Button, Grid, Card, CardContent} from '@mui/material';
import Link from 'next/link';
import FormHelper from '@/helpers/form.helper';
import UserRequest from "@/APIRequests/user.request";
import PhoneInput from 'react-phone-input-2';
import {useRouter} from "next/navigation";
import ToastHelper from "@/helpers/toast.helper";
import 'react-phone-input-2/lib/material.css';


const Registration: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [organization, setOrganization] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { push } = useRouter();

    const handlePhoneChange = (value : string) => {
        setMobile(value);
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const photo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAADlAAAA5QGP5Zs8AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAelQTFRF////JG2SQICAJ05iM1VVNXWAM3CFKUtRM3GCJkdRNHCBJkNNJ0BIMnCAM3GAMnCAJDtBNHKAM3GAIzU5IzY7M3GAM3GAKk1WIi8yM3GAISwwM3GAM3GAICgrHyYoHiIjIiUoFBQUFRUUFhUVFhYWFxYWGRkYHBoYHR0eHR4fHh4fHiEiHiEjHx8gIi8zIjE1IjI2Ix4bIyMlIzU6JCAdJCIgJDY8JyIfJ0VNKEZNKSksKSktKTg5LCciLSsnLychL2JvL2VyMGNvMGVzMGZzMGl2MWp4MWt5MWx6Mm17Mm99MyojMzM5M2BpM3B/M3GANXKAN3KAOGx4OjUvO3SAPXSAPjw2Pj45PmVqPz9HP2ZsQF9iQ0VMQ0VNRUVNRUVORkQ9RkZPR1BMSEhRSUlTSkpUU0EzVldfV1dfWU1AXEc3XE9CXn+AXoCAX2l1YGl2Y4KBZk48a1I/b4J+co2iepOVe3uBe5OVgI+Xh46BjGlPjrDHkm5SmXJVnr/Tn7/TocDUo73Npr/PqcPUqq61r4JgsINhsbK1tMjVxZ98xaOCyKF+0aaB1NbY1qmC2ZRk2qB126J23KJ24KyC4qN55Kh65Onu5Oru5qZ75rWV6qh37Kx+7eLc7qx8769/8bGB8vn+87KB9LOCwa3cagAAACF0Uk5TAAcIDQ8YGSwtL0lQfISXmL/ByNXV2uPu7/Lz8/X5/P7+cDzfRAAAAfxJREFUGBllwYk/FFEcAPDfDrsYZtYsu6wZx+t8uSrddEh3aX8Ula5NTCelSESlKBKr0uEs3l/azHvP7O7H9wtJPjVohE0zbARVH2wW0KPoieoBSKdoFqaxNAVS+EMonb+AUsgPnuwIclfuHSJbjl27jFwkGyR/BLkb+wm3/SZyET9wSgiFq0Q6cAa5kAIuDYVbRNh5iRxFQQNHwELhPnGdePNrlGy7iJwVAAAdpeuEbH3w6R9jnwk5iYIO4IuidJy8/MZcf/fuQCnqAxWltsdPmPTiaRtKKgRR6vs6yqS3X/pQCoKBUm/iO5N+JHpRMiCMUmuCeRKtKIXBxA0980ya78ENJpjoGWZsfXV1nbFh9JgQRk/LNFuam1ti0y3oCYOBSe0zzDHTjkkGBDFF/8Ly8kI/pgiCiile/3S8whQq+KIoxZqG1lYWF1fWhppiKEV9ADq6Th3eXV1jT/weG/szYddU7zlyGl06AAQsxLP7qCveNfvh42xXnDp2HTyHaAXAoWGslnId9uTU1KTdQbnaGGrgUkKNVKjvHBwfH+ysp0JjSAHOX0SFuu6H794/6q6jQpEfpNwyKjTbIyN2MxXKcsGTVUK5yrsDA/FKypVkQYrM/Crqanj2vIG6qvIzIV1OQTl13L5DHeUFObBZRl5hcWlFRWlxYV4GeP4Dm5L5s3KTpvYAAAAASUVORK5CYII=";
        if (FormHelper.isEmail(email)) {
            ToastHelper.errorToast('Valid Email Address Required!');
        } else if (FormHelper.isEmpty(firstName)) {
            ToastHelper.errorToast('First Name Required!');
        } else if (FormHelper.isEmpty(lastName)) {
            ToastHelper.errorToast('Last Name Required!');
        } else if(FormHelper.isEmpty(organization)){
            ToastHelper.errorToast('Organization Name Required!');
        }else if (!FormHelper.isMobile(mobile)) {
            ToastHelper.errorToast('Minimum 10 Digit Required!');
        } else if (FormHelper.isEmpty(password)) {
            ToastHelper.errorToast('Password Required!');
        } else {
            UserRequest.registrationRequest(email, firstName, lastName, organization, mobile, password, photo).then((result : boolean) => {
                if (result) {
                    push("/login");
                }
            });
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
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography component="h1" variant="h4">
                                    Sign Up
                                </Typography>
                            </Box>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField margin="normal" fullWidth label="Email Address" type="email" onChange={(event : ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} />
                                <TextField margin="normal" fullWidth label="First Name" onChange={(event : ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)} />
                                <TextField margin="normal" fullWidth label="Last Name" onChange={(event : ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)} />
                                <TextField margin="normal" fullWidth label="Organization Name" onChange={(event : ChangeEvent<HTMLInputElement>) => setOrganization(event.target.value)} />
                                <PhoneInput
                                    country={'us'}
                                    value={mobile}
                                    enableSearch={true}
                                    inputClass="phoneInput"
                                    containerClass="phoneContainer"
                                    onChange={handlePhoneChange}
                                />
                                <TextField margin="normal" fullWidth label="Password" type="password" onChange={(event : ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 5 }}
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
                                        <Link href="/login" >
                                            <Typography variant="body2">Already have an account? Sign In</Typography>
                                        </Link>
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

export default Registration;