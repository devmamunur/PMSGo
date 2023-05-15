const UsersModel = require("../models/UsersModel")
const OTPModel = require("../models/OTPModel");
const SendEmailUtility = require("../utility/SendEmailUtility");


exports.RecoverVerifyEmail = async (req, res) => {
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000)
    try {
        let UserCount = (await UsersModel.aggregate([{$match: {email: email}}, {$count: "total"}]))
        if (UserCount.length > 0) {
            let CreateOTP = await OTPModel.create({email: email, otp: OTPCode})
            let SendEmail = await SendEmailUtility(email, "Your PIN Code is= " + OTPCode, "Task Manager PIN Verification")
            res.status(200).json({success: true, data: SendEmail})
        } else {
            res.status(204).json({success: false, data: "No User Found"});
        }
    } catch (e) {
        res.status(400).json({success: false, data: e});
    }
}

exports.RecoverVerifyOTP=async (req,res)=>{
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status=0;
    let statusUpdate=1;
    try {
        let OTPCount = await OTPModel.aggregate([{$match: {email: email, otp: OTPCode, status: status}}, {$count: "total"}])
        if (OTPCount.length>0) {
            let OTPUpdate = await OTPModel.updateOne({email: email, otp: OTPCode, status: status}, {
                email: email,
                otp: OTPCode,
                status: statusUpdate
            })
            res.status(200).json({status: "success", data: OTPUpdate})
        } else {
            res.status(400).json({success: false, data: "Invalid OTP Code"});
        }
    }
    catch (e) {
        res.status(400).json({success: false, data: e});
    }
}

exports.RecoverResetPass=async (req,res)=>{

    let email = req.body['email'];
    let OTPCode = req.body['OTP'];
    let NewPass =  req.body['password'];
    let statusUpdate=1;

    try {
        let OTPUsedCount = await OTPModel.aggregate([{$match: {email: email, otp: OTPCode, status: statusUpdate}}, {$count: "total"}])
        if (OTPUsedCount.length>0) {
            let PassUpdate = await UsersModel.updateOne({email: email}, {
                password: NewPass
            })
            res.status(200).json({status: "success", data: PassUpdate})
        } else {
            res.status(400).json({success: false, data: "Invalid Request"});
        }
    }
    catch (e) {
        res.status(400).json({success: false, data: e});
    }
}
