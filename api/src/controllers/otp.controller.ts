import { Request, Response } from 'express';
import OtpRepository from "../repositories/otp.repository";

class OtpController{
    static async RecoverVerifyEmail(req: Request, res: Response){
        try {
            let email = req.params.email;
            const {SendEmail} = await OtpRepository.RecoverVerifyEmail(email);
            res.status(200).json({success: true, data: SendEmail})
        } catch (e) {
            res.status(400).json({success: false, data: e});
        }
    }
    static async RecoverVerifyOTP(req: Request, res: Response){
        try {
            let email = req.params.email;
            let otpCode = req.params.otp;
            const {otpUpdate} = await OtpRepository.RecoverVerifyOTP(email, otpCode);
            res.status(200).json({success: true, data: otpUpdate})
        } catch (e) {
            res.status(400).json({success: false, data: e});
        }
    }

    static async RecoverResetPass(req: Request, res: Response){
        try {
            let email = req.body['email'];
            let otpCode = req.body['OTP'];
            let newPass = req.body['password'];
            const {passUpdate} = await OtpRepository.RecoverResetPass(email, otpCode, newPass);
            res.status(200).json({success: true, data: passUpdate})
        } catch (e) {
            res.status(400).json({success: false, data: e});
        }
    }
}
export default OtpController;