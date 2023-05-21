"use client"
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Avatar, Box, CardHeader, TextField} from "@mui/material";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import UserRequest from "@/APIRequests/user.request";
import FormHelper from "@/helpers/form.helper";
import ToastHelper from "@/helpers/toast.helper";
import {redirect} from "next/navigation";
import {RootState} from "@/redux/store/store";

const Profile: React.FC = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const mobileRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const photoRef = useRef<HTMLInputElement>(null);
    const [photo, setPhoto] = useState<any>();

    useEffect(() => {
        UserRequest.getProfileDetails()
    }, [])

    const ProfileData = useSelector((state: RootState) => state.profile.value);

    const PreviewImage = () => {
        if (photoRef.current && photoRef.current.files && photoRef.current.files.length > 0) {
            let ImgFile = photoRef.current.files[0];
            FormHelper.getBase64(ImgFile).then((base64Img: any) => {
                setPhoto(base64Img);
            })
        }
    }


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let email = emailRef.current!.value;
        let firstName = firstNameRef.current!.value;
        let lastName = lastNameRef.current!.value;
        let mobile = mobileRef.current!.value;
        let password = passwordRef.current!.value;

        if (FormHelper.isEmail(email)) {
            ToastHelper.errorToast("Valid Email Address Required !")
        } else if (FormHelper.isEmpty(firstName)) {
            ToastHelper.errorToast("First Name Required !")
        } else if (FormHelper.isEmpty(lastName)) {
            ToastHelper.errorToast("Last Name Required !")
        } else if (!FormHelper.isMobile(mobile)) {
            ToastHelper.errorToast("Valid Mobile  Required !")
        } else {
            UserRequest.profileUpdateRequest(email, firstName, lastName, mobile, password, photo).then((result: boolean) => {
                if (result) {
                    redirect("/")
                }
            })
        }
    }
    return (
        <>
            {ProfileData ?
                (
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardHeader sx={{textAlign: 'center'}} title="Update Profile">
                                </CardHeader>
                                <CardContent component="form" onSubmit={handleSubmit} sx={{textAlign: 'center'}}>
                                    <Box sx={{textAlign: 'center', width: '100%'}}>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={ProfileData.photo}
                                            sx={{width: 100, height: 100, display: 'inline-block'}}
                                        />
                                    </Box>
                                    <br/>
                                    <Divider/>
                                    <br/>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                type="file"
                                                inputRef={photoRef}
                                                onChange={PreviewImage}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Email Address"
                                                type="email"
                                                inputRef={emailRef}
                                                defaultValue={ProfileData['email']}
                                                key={ProfileData['email']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="First Name"
                                                inputRef={firstNameRef}
                                                defaultValue={ProfileData['firstName']}
                                                key={ProfileData['firstName']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Last Name"
                                                inputRef={lastNameRef}
                                                defaultValue={ProfileData['lastName']}
                                                key={ProfileData['lastName']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                label="Mobile"
                                                type="number"
                                                inputRef={mobileRef}
                                                defaultValue={ProfileData['mobile']}
                                                key={ProfileData['mobile']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                label="Password"
                                                type="password"
                                                inputRef={passwordRef}
                                                defaultValue=""
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{textAlign: 'center', marginTop: '15px'}}>
                                            <Button sx={{display: 'inline-block'}} onClick={handleSubmit}
                                                    variant="contained" color="primary">Update</Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                )
                :
                ''
            }
        </>
    );
};

export default Profile;