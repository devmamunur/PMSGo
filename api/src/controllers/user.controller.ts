import {Request, Response} from 'express';
import UserRepository from "../repositories/user.repository";

class UserController {
    // Registration
    static async registration(req: Request, res: Response) {
        try {
            const reqBody = req.body;
            const document = await UserRepository.registration(reqBody);
            res.status(200).json({success: true, data: document});
        } catch (error) {
            res.status(200).json({success: false, data: error});
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
            const email = req.headers['email'] as string;
            const reqBody = req.body;

            const {data} = await UserRepository.updateProfile(email, reqBody);
            res.status(200).json({success: true, data: data});
        } catch (error) {
            res.status(400).json({success: false, data: error});
        }
    }

    // Profile Details
    static async profileDetails(req: Request, res: Response) {
        try {
            const email = req.headers["email"];
            const document = await UserRepository.profileDetails(email);
            res.status(200).json({success: true, data: document});
        } catch (error) {
            res.status(400).json({success: false, data: error});
        }
    }
}

export default UserController;