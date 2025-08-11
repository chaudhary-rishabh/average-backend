import jwt from 'jsonwebtoken';
import { config } from '../config/index';

export const generateAccessToken = (user: any) => {
    return jwt.sign({ id: user._id, role: user.role }, config.jwt.accessSecret, { expiresIn: config.jwt.accessExpiration });
};

export const generateRefreshToken = (user: any) => {
    return jwt.sign({ id: user._id }, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpiration });
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, config.jwt.refreshSecret) as { id: string };
};