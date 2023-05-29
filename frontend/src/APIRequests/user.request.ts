import store from "@/redux/store/store";
import {hideLoader, showLoader} from "@/redux/state-slice/SettingsSlice";
import axios from "axios";
import SessionHelper from "@/helpers/session.helper";
import ToastHelper from "@/helpers/toast.helper";
import {setProfile} from "@/redux/state-slice/ProfileSlice";
let baseURL = process.env.NEXT_PUBLIC_API_URL;

class UserRequest {
    static registrationRequest(email: string, firstName: string, lastName: string, organization : string, mobile: string, password: string, photo: any) {
        store.dispatch(showLoader);
        let URL : string = baseURL+"/registration";
        let postBody = {email, firstName, lastName, organization, mobile, password, photo};
        return axios.post(URL, postBody).then((res) => {
            store.dispatch(hideLoader);
            ToastHelper.successToast("Registration Success")
            return true;
        }).catch((error) => {
            store.dispatch(hideLoader);
            ToastHelper.errorToast(error.response.data.data);
            return false;
        })
    }

    static loginRequest(email: string, password: string) {
        store.dispatch(showLoader);
        let URL = baseURL + "/login";
        let postBody = {email, password};
        return axios.post(URL, postBody).then((res) => {
            store.dispatch(hideLoader);
            ToastHelper.successToast("Login Success")
            return true
        }).catch((error) => {
            store.dispatch(hideLoader);
            ToastHelper.errorToast(error.response.data.data);
            return false
        })
    }

    static getProfileDetails() {
        store.dispatch(showLoader())
        let URL = baseURL + "/profile-details";
        axios.get(URL).then((res) => {
            store.dispatch(hideLoader())
            if (res.status === 200) {
                store.dispatch(setProfile(res.data['data'][0]));
            } else {
                ToastHelper.errorToast("Something Went Wrong");
            }
        }).catch((err) => {
            ToastHelper.errorToast("Something Went Wrong")
            store.dispatch(hideLoader());
        });
    }

    static profileUpdateRequest(email: string, firstName: string, lastName: string, mobile: string, password: string, photo: string) {
        store.dispatch(showLoader())
        let URL = baseURL + "/profile-update";
        let PostBody = {email, firstName, lastName, mobile, password, photo}
        return axios.post(URL, PostBody).then((res) => {
            store.dispatch(hideLoader())
            if (res.status === 200) {
                ToastHelper.successToast("Profile Update Success")
                return true;
            } else {
                ToastHelper.errorToast("Something Went Wrong")
                return false;
            }
        }).catch((err) => {
            ToastHelper.errorToast("Something Went Wrong");
            store.dispatch(hideLoader())
            return false;
        });
    }

    static recoverVerifyEmailRequest(email: string) {
        store.dispatch(showLoader())
        let URL = baseURL + "/recover-verify-email";
        let postBody = {email}
        return axios.post(URL, postBody).then((res) => {
            store.dispatch(hideLoader())
            SessionHelper.setEmail(email);
            ToastHelper.successToast("A 6 Digit verification code has been sent to your email address. ");
            return true;
        }).catch((error) => {
            store.dispatch(hideLoader())
            ToastHelper.errorToast(error.response.data.data);
            return false;
        });
    }

    static recoverVerifyOTPRequest(email: string, OTP: string) {
        store.dispatch(showLoader())
        let URL = baseURL + "/recover-verify-otp";
        let postBody = {email, OTP}
        return axios.post(URL, postBody).then((res) => {
            store.dispatch(hideLoader())
            SessionHelper.setOTP(OTP)
            ToastHelper.successToast("Code Verification Success");
            return true;
        }).catch((error) => {
            ToastHelper.errorToast(error.response.data.data)
            store.dispatch(hideLoader())
            return false;
        });
    }

    static recoverResetPassRequest(email: string, OTP: string, password: string) {
        store.dispatch(showLoader())
        let URL = baseURL + "/recover-reset-pass";
        let PostBody = {email: email, OTP: OTP, password: password}
        return axios.post(URL, PostBody).then((res) => {
            store.dispatch(hideLoader());
            SessionHelper.removeEmailAndOTP();
            ToastHelper.successToast("New Password Created");
            return true;
        }).catch((err) => {
            ToastHelper.errorToast("Something Went Wrong")
            store.dispatch(hideLoader())
            return false;
        });
    }
}

export default UserRequest;