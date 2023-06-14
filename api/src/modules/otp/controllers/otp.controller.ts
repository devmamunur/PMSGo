// *******************************
// I Will Rewrite All those Code
// ******************************




// import { Request, Response } from 'express';
// import OtpRepository from '../repositories/otp.repository';
// import OtpValidator from '../validations/otp.validator';
//
// class OtpController {
//   static async RecoverVerifyEmail(req: Request, res: Response) {
//     try {
//       await OtpValidator.verifyEmailValidation(req.body);
//       const { SendEmail } = await OtpRepository.RecoverVerifyEmail(req.body);
//       res.status(200).json({ success: true, data: SendEmail });
//     } catch (error) {
//       res.status(400).json({ success: false, data: error.message });
//     }
//   }
//   static async RecoverVerifyOTP(req: Request, res: Response) {
//     try {
//       await OtpValidator.verifyOTPValidation(req.body);
//       const { otpUpdate } = await OtpRepository.RecoverVerifyOTP(req.body);
//       res.status(200).json({ success: true, data: otpUpdate });
//     } catch (error) {
//       res.status(400).json({ success: false, data: error.message });
//     }
//   }
//
//   static async RecoverResetPass(req: Request, res: Response) {
//     try {
//       await OtpValidator.resetPassValidation(req.body);
//       const { passUpdate } = await OtpRepository.RecoverResetPass(req.body);
//       res.status(200).json({ success: true, data: passUpdate });
//     } catch (error) {
//       res.status(400).json({ success: false, data: error.message });
//     }
//   }
// }
// export default OtpController;
