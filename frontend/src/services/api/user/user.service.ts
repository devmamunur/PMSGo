import axios from '@/services/axios';
import { UserCreateInterface } from '@/interfaces/user/user.interface';
import ToastHelper from '@/helpers/toast.helper';
import store from '@/redux/store/store';
import { setUser } from '@/redux/state-slice/UserSlice';
class UserService {
  async create(body: UserCreateInterface) {
    return await axios
      .post('/users', body)
      .then(res => {
        ToastHelper.successToast(res.data.message);
        return true;
      })
      .catch(err => {
        ToastHelper.errorToast(err.response.data.error);
        return false;
      });
  }
  async get() {
    return await axios
      .get('/users')
      .then(res => {
        console.log(res.data.data);
        store.dispatch(setUser(res.data.data));
        return true;
      })
      .catch(err => {
        ToastHelper.errorToast(err.response.data.error);
        return false;
      });
  }
}

export const userService: UserService = new UserService();
