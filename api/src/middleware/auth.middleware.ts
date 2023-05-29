import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader : string | undefined = req.headers['authorization'] as string;
    if (!authHeader ) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any, decoded: any) => {
        if (err) {
            return res.status(400).json({ success: false, data: err });
        } else {
            req.headers.userId = decoded.data;
            next();
        }
    });
};

export default authenticateToken;
