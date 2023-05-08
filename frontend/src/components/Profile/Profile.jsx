import React, {useEffect, useRef} from 'react';
import {GetProfileDetails, ProfileUpdateRequest} from "../../APIRequest/APIRequest.js";
import {useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Avatar, Box, CardHeader, TextField} from "@mui/material";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {ErrorToast, getBase64, IsEmail, IsEmpty, IsMobile} from "../../helper/FormHelper.js";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    let navigate=useNavigate();

    const emailRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const mobileRef = useRef(null);
    const passwordRef = useRef(null);
    const photoRef = useRef(null);
    let userImgView = useRef(null);

    useEffect(() => {
        GetProfileDetails()
    }, [])

    const ProfileData = useSelector((state) => state.profile.value);

    const PreviewImage = () => {
        let ImgFile = photoRef.current.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            userImgView.src=base64Img;
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        let email = emailRef.current.value;
        let firstName = firstNameRef.current.value;
        let lastName = lastNameRef.current.value;
        let mobile = mobileRef.current.value;
        let password = passwordRef.current.value;
        let photo = userImgView.src;

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
        else{
            ProfileUpdateRequest(email,firstName,lastName,mobile,password,photo).then((result)=>{
                if(result===true){
                    navigate("/")
                }
            })
        }
    }
    return (
        <>
            <Grid container justifyContent="center" spacing={3} >
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader sx={{textAlign : 'center'}} title="Update Profile">
                        </CardHeader>
                        <CardContent  component="form" onSubmit={handleSubmit} sx={{textAlign : 'center'}}>
                            <Box sx={{textAlign : 'center', width : '100%'}}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={ProfileData.photo}
                                    sx={{ width: 100, height: 100, display : 'inline-block'}}
                                />
                            </Box>
                            <br/>
                            <Divider/>
                            <br/>
                            <Grid container  spacing={2} >
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
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="First Name"
                                        inputRef={firstNameRef}
                                        defaultValue={ProfileData['firstName']}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Last Name"
                                        inputRef={lastNameRef}
                                        defaultValue={ProfileData['lastName']}
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
                                <Grid item xs={12}  sx={{textAlign : 'center', marginTop : '15px'}}>
                                    <Button sx={{display : 'inline-block'}} onClick={handleSubmit} variant="contained" color="primary">Update</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </>
    );
};

export default Profile;