import axios from '@/services/axios';
import { SignUpInterface } from '@/interfaces/auth/auth.interface';

class AuthService {
  async signup(body: SignUpInterface) {
    return await axios.post('/signup', body);
  }
  async signin(body: SignUpInterface) {
    return await axios.post('/signin', body);
  }
}

export const authService: AuthService = new AuthService();
