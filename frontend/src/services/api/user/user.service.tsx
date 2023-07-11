import axios from '@/services/axios';
import {UserCreateInterface} from '@/interfaces/user/user.interface';
class UserService{
    async create(body : UserCreateInterface){
        return await axios.post('/user', body);
    }
}

export const userService : UserService = new UserService();