import {NextFunction, Request, Response} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { envConfig } from '../config/env.config';
import { NotAuthorizedError } from '../utility/error.handler.utility';

declare global {
  namespace Express {
    interface Request {
      currentUser?: AuthPayload;
    }
  }
}

export interface AuthPayload {
  _id: string;
  name: string;
  email: string;
  type: string;
}

export interface DecodedToken {
  data: AuthPayload;
}
type CustomJwtPayload = JwtPayload & DecodedToken;

class AuthMiddleware {
  checkAuth(req: Request, _res: Response, next : NextFunction) {
    const authHeader: string | undefined = req.headers['authorization'] as string;
    if (!authHeader) {
      throw new NotAuthorizedError('Token is not available. Please login again.');
    }
    try {
      const token = authHeader.split(' ')[1];
      const payload: CustomJwtPayload  = jwt.verify(token, envConfig.JWT_SECRET_KEY) as CustomJwtPayload;
      req.currentUser = payload.data;
    } catch (error) {
      throw new NotAuthorizedError('Token is invalid. Please login again.');
    }
    next();
  }

  onlyCompany(req: Request, res: Response, next : NextFunction) {
    if (req.currentUser && req.currentUser.type === 'company') {
      next();
    } else {
      throw new NotAuthorizedError('Don\'t have permission to access this route.');
    }
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();
