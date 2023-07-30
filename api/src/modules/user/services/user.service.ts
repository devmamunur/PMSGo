import UserModel from '../models/user.model';
import GeneratePasswordUtility from '../../../global/utility/generate-password.utility';
import {userCreateInterface} from '../interfaces/user.interface';
import {Request} from 'express';
import {Types} from 'mongoose';


class UserService{
  async create(req : Request) : Promise<void>{
    try {
      const companyId = req.currentUser._id;
      const reqBody : userCreateInterface = req.body;
      reqBody.company = companyId;

      reqBody.password = GeneratePasswordUtility(reqBody.password);
      await UserModel.create(reqBody);
    }catch (error){
      throw new Error('User create failed: '+error.message);
    }
  }
  async get(req : Request) {
    try {
      const userId = req.currentUser._id;
      return await UserModel.aggregate([
        {
          $match: {
            company: new Types.ObjectId(userId)
          }
        }
      ]);
    }catch (error){
      throw new Error('User get failed: '+error.message);
    }
  }
}

export const userService : UserService = new UserService();
