import {Request, Response} from 'express';
import UserRepository from "../repositories/user.repository";
import UserValidator from "../validators/user.validator";

class UserController {
    // Registration
    static async registration(req: Request, res: Response) {
        try {
            await UserValidator.registerValidation(req.body);
            const document = await UserRepository.registration(req.body);
            res.status(200).json({success: true, data: document});
        } catch (error) {
            res.status(400).json({ success: false, data: error });
            // if(error.details){
            //     res.status(400).json({success: false, data: error.details});
            // }else {
            //     res.status(400).json({ success: false, data: error.message });
            // }
        }
    }

    // Login
    static async login(req: Request, res: Response) {
        try {
            const reqBody = req.body;
            const {token, data} = await UserRepository.login(reqBody);
            res.status(200).json({success: true, token: token, data: data});
        } catch (error) {
            res.status(400).json({success: false, data: error});
        }
    }

    // Profile Update
    static async updateProfile(req: Request, res: Response) {
        try {
            const userIdValue: string | string[] = req.headers["userId"];
            const userId: string = Array.isArray(userIdValue) ? userIdValue[0] : userIdValue;
            const reqBody = req.body;

            const {data} = await UserRepository.updateProfile(userId, reqBody);
            res.status(200).json({success: true, data: data});
        } catch (error) {
            res.status(400).json({success: false, data: error});
        }
    }

    // Profile Details
    static async profileDetails(req: Request, res: Response) {
        try {
            const userIdValue: string | string[] = req.headers["userId"];
            const userId: string = Array.isArray(userIdValue) ? userIdValue[0] : userIdValue;

            const document = await UserRepository.profileDetails(userId);
            res.status(200).json({success: true, data: document});
        } catch (error) {
            res.status(400).json({success: false, data: error});
        }
    }
}

export default UserController;