import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.config';

const generateTokenUtility = (payload: any) => {
  return jwt.sign(payload, envConfig.JWT_SECRET_KEY);
};
export default generateTokenUtility;
