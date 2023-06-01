import OTPModel from '../models/otp.model';
import SendEmailUtility from '../utility/send-email.utility';
import UserModel from '../models/user.model';
import { Request } from 'express';
import GeneratePasswordUtility from '../utility/generate-password.utility';

class OtpRepository {
  static async RecoverVerifyEmail(reqBody: Request['body']) {
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const UserCount = await UserModel.aggregate([{ $match: { email: reqBody.email } }, { $count: 'total' }]);
    if (UserCount.length > 0) {
      const CreateOTP = await OTPModel.create({ email: reqBody.email, otp: otpCode });
      const SendEmail = await SendEmailUtility(reqBody.email, 'Your PIN Code is = ' + otpCode, 'Task Manager PIN Verification');
      return { SendEmail };
    } else {
      throw new Error('No User Found');
    }
  }

  static async RecoverVerifyOTP(reqBody: Request['body']) {
    try {
      const status = 0;
      const statusUpdate = 1;
      const otpCount = await OTPModel.aggregate([
        {
          $match: {
            email: reqBody.email,
            otp: reqBody.OTP,
            status: status
          }
        },
        { $count: 'total' }
      ]);

      if (otpCount.length > 0) {
        const otpUpdate = await OTPModel.updateOne(
          { email: reqBody.email, otp: reqBody.OTP, status: status },
          {
            email: reqBody.email,
            otp: reqBody.OTP,
            status: statusUpdate
          }
        );
        return { otpUpdate };
      }
    } catch (error) {
      throw error;
    }
  }

  static async RecoverResetPass(reqBody: Request['body']) {
    try {
      const statusUpdate = 1;
      const otpUsedCount = await OTPModel.aggregate([
        {
          $match: {
            email: reqBody.email,
            otp: reqBody.OTP,
            status: statusUpdate
          }
        },
        { $count: 'total' }
      ]);
      if (otpUsedCount.length > 0) {
        const passUpdate = await UserModel.updateOne(
          { email: reqBody.email },
          {
            password: GeneratePasswordUtility(reqBody.password)
          }
        );
        return { passUpdate };
      }
    } catch (error) {
      throw error;
    }
  }
}

export default OtpRepository;
