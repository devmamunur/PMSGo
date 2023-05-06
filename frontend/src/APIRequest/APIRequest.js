import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper.js";

const BaseURL = "http://localhost:5000/api/v1"

export  function RegistrationRequest (email, firstName, lastName, mobile, password, photo = null){
    let URL = BaseURL+"/registration";
    let postBody = {email,firstName,lastName,mobile,password,photo};

    return  axios.post(URL, postBody).then((res) => {
        debugger;
        if(res.status===200){
            debugger;
            if(res.data['success']===false){
                debugger;
                if(res.data['data']['keyPattern']['email']===1){
                    debugger;
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
        ErrorToast("Something Went Wrong!");
        return false
    })
}