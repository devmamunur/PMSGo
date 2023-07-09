import UserModel from '../models/user.model';
import GeneratePasswordUtility from '../../../global/utility/generate-password.utility';
import {userCreateInterface} from '../interfaces/user.interface';



class UserService{
  async create(reqBody :userCreateInterface) : Promise<void>{
    try {
      reqBody.password = GeneratePasswordUtility(reqBody.password);
      await UserModel.create(reqBody);
    }catch (error){
      throw new Error('User create failed: '+error.message);
    }
  }
}

export const userService : UserService = new UserService();
