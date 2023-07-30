import axios from '@/services/axios';
import { UserCreateInterface } from '@/interfaces/user/user.interface';
import ToastHelper from '@/helpers/toast.helper';
import store from '@/redux/store/store';
import { setUser } from '@/redux/state-slice/UserSlice';
class UsersService {
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
        store.dispatch(setUser(res.data.data));
        return true;
      })
      .catch(err => {
        ToastHelper.errorToast(err.response.data.error);
        return false;
      });
  }
}

export const usersService: UsersService = new UsersService();
