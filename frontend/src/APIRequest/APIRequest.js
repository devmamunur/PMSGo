import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/SettingsSlice.js";
import {getToken, setEmail, setOTP, setToken, setUserDetails} from "../helper/SessionHelper.js";
import {SetCanceledTask, SetCompletedTask, SetNewTask, SetProgressTask} from "../redux/state-slice/TaskSlice.js";
import {SetSummary} from "../redux/state-slice/SummarySlice.js";
import {SetProfile} from "../redux/state-slice/ProfileSlice.js";

const AxiosHeader = {headers : {"token" : getToken()}}
const BaseURL = "http://localhost:5000/api/v1"

export  function RegistrationRequest (email, firstName, lastName, mobile, password, photo){
    store.dispatch(ShowLoader);
    let URL = BaseURL+"/registration";
    let postBody = {email,firstName,lastName,mobile,password,photo};

    return  axios.post(URL, postBody).then((res) => {
        store.dispatch(HideLoader);
        if(res.status===200){
            if(res.data['success']===false){
                if(res.data['data']['keyPattern']['email']===1){
                    ErrorToast("Email Already Exist")
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong")
                    return false;
                }
            }
            else {
                SuccessToast("Registration Success")
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }).catch((err) => {
        store.dispatch(HideLoader);
        ErrorToast("Something Went Wrong!");
        return false
    })
}

export function LoginRequest (email, password){
    store.dispatch(ShowLoader);
    let URL = BaseURL+"/login";
    let postBody = {email,password};

    return axios.post(URL, postBody).then((res) => {
        store.dispatch(HideLoader);
        if(res.status === 200){
            setToken(res.data['token']);
            setUserDetails(res.data['data'])
            SuccessToast("Login Success")
            return true
        }else {
            ErrorToast("Invalid Email or Password")
            return  false;
        }
    }).catch((err) => {
        store.dispatch(HideLoader);
        ErrorToast("Something Went Wrong!");
        return false
    })
}

export function  NewTaskRequest(title, description, status = 'New') {
    store.dispatch(ShowLoader);
    let URL = BaseURL+"/task";
    let postBody = {title,description, status};

    return axios.post(URL, postBody, AxiosHeader).then((res) => {
        store.dispatch(HideLoader);
        if(res.status === 200){
            SuccessToast("New Task Created")
            return true
        }else {
            ErrorToast("Something Went Wrong!")
            return  false;
        }
    }).catch((err) => {
        store.dispatch(HideLoader);
        ErrorToast("Something Went Wrong!");
        return false
    })
}

export function taskListByStatus(status) {
    store.dispatch(ShowLoader())
    let URL= BaseURL+"/task/filter/"+status;

    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            if(status==="New"){
                store.dispatch(SetNewTask(res.data['data']))
            }
            else if(status==="Completed"){
                store.dispatch(SetCompletedTask(res.data['data']))
            }
            else if(status==="Canceled"){
                store.dispatch(SetCanceledTask(res.data['data']))
            }
            else if(status==="Progress"){
                store.dispatch(SetProgressTask(res.data['data']))
            }
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}

export function summaryRequest(){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/task/status-count";
    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            store.dispatch(SetSummary(res.data['data']))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}

export function DeleteRequest(id){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/task/"+id;
    return axios.delete(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            SuccessToast("Delete Successful")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}

export function UpdateStatusRequest(id, status) {
    store.dispatch(ShowLoader())

    let URL=BaseURL+"/task/update/"+id+"/"+status;

    return axios.get(URL, AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            SuccessToast("Status Updated")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}

export function GetProfileDetails(){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/profile-details";
    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            store.dispatch(SetProfile(res.data['data'][0]));
        }
        else{
            ErrorToast("Something Went Wrong");
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader());
    });
}

export function ProfileUpdateRequest(email,firstName,lastName,mobile,password,photo){

    store.dispatch(ShowLoader())

    let URL=BaseURL+"/profile-update";


    let PostBody={email,firstName,lastName,mobile,password,photo}
    let UserDetails={email,firstName,lastName,mobile,password,photo}


    return axios.post(URL, PostBody, AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){

            SuccessToast("Profile Update Success")
            setUserDetails(UserDetails)

            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}


export function RecoverVerifyEmailRequest(email){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/recover-verify-email/"+email;
    return axios.get(URL).then((res)=>{
        alert(JSON.stringify(res));
        store.dispatch(HideLoader())
        if(res.status===200){
            alert("Status is 200");
            if(res.data['status']==="fail"){
                ErrorToast("No user found");
                return false;
            }
            else{
                setEmail(email)
                SuccessToast("A 6 Digit verification code has been sent to your email address. ");
                return true;
            }
        }
        else{
            alert("Status is Not 200");
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err)=>{
        alert("Status is ERROR");
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}

// Recover Password Step 02 Verify OTP
export function RecoverVerifyOTPRequest(email,OTP){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/recover-verify-otp/"+email+"/"+OTP;
    return axios.get(URL).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status']==="fail"){
                ErrorToast(res.data['data']);
                return false;
            }
            else{
                setOTP(OTP)
                SuccessToast("Code Verification Success");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}

// Recover Password Step 03 Reset Pass
export function RecoverResetPassRequest(email,OTP,password){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/recover-reset-pass";
    let PostBody={email:email,OTP:OTP,password:password}
    return axios.post(URL,PostBody).then((res)=>{
        store.dispatch(HideLoader())
        alert("Success");
        if(res.status===200){
            alert("status 200");
            if(res.data['status']==="fail"){
                ErrorToast(res.data['data']);
                return false;
            }
            else{
                setOTP(OTP)
                SuccessToast("NEW PASSWORD CREATED");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        alert("Faild");
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}