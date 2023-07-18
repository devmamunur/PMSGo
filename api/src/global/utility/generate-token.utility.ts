import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.config';
import {Types} from 'mongoose';

export interface tokenPayloadInterface{
  _id: Types.ObjectId,
  name: string,
  email: string,
  type: string
}

const generateTokenUtility = (userData: tokenPayloadInterface) => {
  const payload = { exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, data: userData};
  return jwt.sign(payload, envConfig.JWT_SECRET_KEY);
};
export default generateTokenUtility;
