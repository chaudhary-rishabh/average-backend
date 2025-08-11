import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { sendEmail } from '../utils/email.util';
import { sendSMS } from '../utils/otp.util';
import { verifyRefreshToken } from '../utils/jwt.util';
import jwt from 'jsonwebtoken';
import { config } from '../config/index';

export const signup = async (data: { name: string; email: string; password: string; phone?: string }) => {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) throw new Error('User already exists');
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await User.create({ ...data, password: hashedPassword, verificationCode });
    return user;
};

export const sendVerificationEmail = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    await sendEmail(email, 'Verify Email', `Your verification code is ${user.verificationCode}`);
};

export const verifyEmail = async (email: string, code: string) => {
    const user = await User.findOne({ email });
    if (!user || user.verificationCode !== code) throw new Error('Invalid code');
    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();
};

export const login = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) throw new Error('User not found or not verified');
    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) throw new Error('Invalid credentials');
    return user;
};

export const send2FACode = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const twoFACode = Math.floor(100000 + Math.random() * 900000).toString();
    user.twoFACode = twoFACode;
    await user.save();
    await sendEmail(email, '2FA Code', `Your 2FA code is ${twoFACode}`);
};

export const verify2FA = async (email: string, code: string) => {
    const user = await User.findOne({ email });
    if (!user || user.twoFACode !== code) throw new Error('Invalid 2FA code');
    user.twoFACode = undefined;
    await user.save();
};

export const refresh = async (refreshToken: string) => {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error('Invalid refresh token');
    return user;
};

export const forgotPassword = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const resetToken = jwt.sign({ id: user._id }, config.jwt.accessSecret, { expiresIn: '1h' });
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000);
    await user.save();
    const resetLink = `${config.appUrl}/reset-password?token=${resetToken}`;
    await sendEmail(email, 'Reset Password', `Reset your password: ${resetLink}`);
};

export const resetPassword = async (token: string, newPassword: string) => {
    const decoded = jwt.verify(token, config.jwt.accessSecret) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user || user.resetToken !== token || (user.resetTokenExpiry && user.resetTokenExpiry < new Date())) {
        throw new Error('Invalid or expired token');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
};

export const sendOtp = async (phone: string) => {
    const user = await User.findOne({ phone });
    if (!user) throw new Error('User not found');
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.otpCode = otpCode;
    user.otpExpiry = new Date(Date.now() + 300000); // 5 min
    await user.save();
    await sendSMS(phone, `Your OTP is ${otpCode}`);
};

export const verifyOtp = async (phone: string, code: string) => {
    const user = await User.findOne({ phone });
    if (!user || user.otpCode !== code || (user.otpExpiry && user.otpExpiry < new Date())) {
        throw new Error('Invalid or expired OTP');
    }
    user.otpCode = undefined;
    user.otpExpiry = undefined;
    await user.save();
    return user;
};