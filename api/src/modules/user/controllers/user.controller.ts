import {Request, Response} from 'express';
import {userRepository} from '../repositories/user.repository';

class UserController{
    async create(req: Request, res: Response) : Promise<void>{
     await userRepository.create(req, res);
    }
    async get(req: Request, res: Response) : Promise<void>{
      await userRepository.get(req, res);
  }
}
export const userController  : UserController = new UserController();
