import store from "@/redux/store/store";
import {HideLoader, ShowLoader} from "@/redux/state-slice/SettingsSlice";
import axios from "axios";
import SessionHelper from "@/helper/SessionHelper";
import FormHelper from "@/helper/FormHelper";
const AxiosHeader = {headers : {"token" : SessionHelper.getToken()}}
const BaseURL = "http://localhost:5000/api/v1"

class UserRequest{
    static RegistrationRequest (email : string, firstName : string, lastName : string, mobile : string, password : string, photo : any){
        store.dispatch(ShowLoader);
        let URL = BaseURL+"/registration";
        let postBody = {email,firstName,lastName,mobile,password,photo};

        return  axios.post(URL, postBody).then((res) => {
            store.dispatch(HideLoader);
            FormHelper.SuccessToast("Registration Success")
            return true;
        }).catch((error) => {
            store.dispatch(HideLoader);
            console.log('Error is : ', error.response.data.data);
            FormHelper.ErrorToast(error.response.data.data);
            return false;
        })
    }
}

export default UserRequest;