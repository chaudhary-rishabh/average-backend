import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index';
import User from '../models/user.model';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });
        const decoded = jwt.verify(token, config.jwt.accessSecret) as { id: string };
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: 'Invalid token' });
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export const authorize = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    if (!roles.includes(user.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
};