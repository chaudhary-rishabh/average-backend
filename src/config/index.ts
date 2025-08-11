import dotenv from 'dotenv';

dotenv.config();

export const config = {
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET || 'access-secret',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
        accessExpiration: '15m',
        refreshExpiration: '7d',
    },
    email: {
        host: process.env.EMAIL_HOST || 'smtp.example.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        user: process.env.EMAIL_USER || 'user@example.com',
        pass: process.env.EMAIL_PASS || 'password',
    },
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID || '',
        authToken: process.env.TWILIO_AUTH_TOKEN || '',
        phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    appUrl: process.env.APP_URL || 'http://localhost:5000',
};