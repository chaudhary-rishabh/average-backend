import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.util';
import passport from 'passport';

export const signup = async (req: Request, res: Response) => {
    try {
        const user = await authService.signup(req.body);
        await authService.sendVerificationEmail(user.email);
        res.status(201).json({ message: 'User created. Verification email sent.' });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { code, email } = req.body;
        await authService.verifyEmail(email, code);
        res.json({ message: 'Email verified.' });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password);
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
        // Send 2FA code if enabled
        await authService.send2FACode(user.email);
        res.json({ message: '2FA code sent to email.', accessToken }); // Hold full login until 2FA
    } catch (err: any) {
        res.status(401).json({ message: err.message });
    }
};

export const verify2FA = async (req: Request, res: Response) => {
    try {
        const { email, code } = req.body;
        await authService.verify2FA(email, code);
        res.json({ message: '2FA verified. Login complete.' });
    } catch (err: any) {
        res.status(401).json({ message: err.message });
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out.' });
};

export const refresh = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new Error('No refresh token');
        const user = await authService.refresh(refreshToken);
        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
    } catch (err: any) {
        res.status(401).json({ message: err.message });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        await authService.forgotPassword(email);
        res.json({ message: 'Reset link sent to email.' });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;
        await authService.resetPassword(token, newPassword);
        res.json({ message: 'Password reset successful.' });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const googleCallback = (req: Request, res: Response) => {
    const user = req.user as any;
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.redirect('/'); // Or send tokens
};

export const sendOtp = async (req: Request, res: Response) => {
    try {
        const { phone } = req.body;
        await authService.sendOtp(phone);
        res.json({ message: 'OTP sent to phone.' });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const verifyOtpLogin = async (req: Request, res: Response) => {
    try {
        const { phone, code } = req.body;
        const user = await authService.verifyOtp(phone, code);
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.json({ accessToken });
    } catch (err: any) {
        res.status(401).json({ message: err.message });
    }
};