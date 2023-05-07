import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/Settings-slice.js";
import {getToken, setToken, setUserDetails} from "../helper/SessionHelper.js";
import {SetCanceledTask, SetCompletedTask, SetNewTask, SetProgressTask} from "../redux/state-slice/TaskSlice.js";

const AxiosHeader = {headers : {"token" : getToken()}}
const BaseURL = "http://localhost:5000/api/v1"

export  function RegistrationRequest (email, firstName, lastName, mobile, password, photo = null){
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

export function  NewTaskRequest(title, description) {
    store.dispatch(ShowLoader);
    let URL = BaseURL+"/task";
    let postBody = {title,description};

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