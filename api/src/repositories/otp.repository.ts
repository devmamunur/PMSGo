import OTPModel from "../models/otp.model";
import SendEmailUtility from "../utility/send-email.utility";
import UserModel from "../models/user.model";

class OtpRepository {
    static async RecoverVerifyEmail(email: any) {
        let otpCode = Math.floor(100000 + Math.random() * 900000);
        let UserCount = (await UserModel.aggregate([{$match: {email: email}}, {$count: "total"}]))
        if (UserCount.length > 0) {
            let CreateOTP = await OTPModel.create({email: email, otp: otpCode})
            let SendEmail = await SendEmailUtility(email, "Your PIN Code is= " + otpCode, "Task Manager PIN Verification")
            return {SendEmail};
        } else {
            throw new Error("No User Found");
        }
    }

    static async RecoverVerifyOTP(email: any, otpCode: any) {
        let status = 0;
        let statusUpdate = 1;
        let otpCount = await OTPModel.aggregate([{
            $match: {
                email: email,
                otp: otpCode,
                status: status
            }
        }, {$count: "total"}]);

        if (otpCount.length > 0) {
            let otpUpdate = await OTPModel.updateOne({email: email, otp: otpCode, status: status}, {
                email: email,
                otp: otpCode,
                status: statusUpdate
            })
            return {otpUpdate};
        } else {
            throw new Error("Invalid OTP Code");
        }
    }

    static async RecoverResetPass(email : any, otpCode : any, newPass : any){
        let statusUpdate = 1;
        let otpUsedCount = await OTPModel.aggregate([{
            $match: {
                email: email,
                otp: otpCode,
                status: statusUpdate
            }
        }, {$count: "total"}])

        if (otpUsedCount.length > 0) {
            let passUpdate = await UserModel.updateOne({email: email}, {
                password: newPass
            })
            return {passUpdate};
        } else {
            throw new Error("Invalid Request");
        }
    }


}

export default OtpRepository;