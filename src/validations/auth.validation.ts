import { z } from 'zod';

export const signupSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().optional(),
});

export const verifyEmailSchema = z.object({
    email: z.string().email(),
    code: z.string().length(6),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const verify2FASchema = z.object({
    email: z.string().email(),
    code: z.string().length(6),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

export const resetPasswordSchema = z.object({
    token: z.string(),
    newPassword: z.string().min(6),
});

export const sendOtpSchema = z.object({
    phone: z.string(),
});

export const verifyOtpSchema = z.object({
    phone: z.string(),
    code: z.string().length(6),
});