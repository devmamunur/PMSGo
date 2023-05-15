import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers['token'] as string;
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    jwt.verify(token, 'Secret123', (err: any, decoded: any) => {
        if (err) {
            return res.status(400).json({ success: false, data: err });
        } else {
            req.headers.email = decoded.data;
            next();
        }
    });
};

export default authenticateToken;
