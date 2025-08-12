import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import * as validation from '../validations/auth.validation';
import passport from 'passport';
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 5, 
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again after an hour'
    },
    standardHeaders: true,
    legacyHeaders: false
});

const router = Router();

router.post('/signup', authLimiter, validate(validation.signupSchema), authController.signup);
router.post('/verify-email', authLimiter, validate(validation.verifyEmailSchema), authController.verifyEmail);
router.post('/login', authLimiter, validate(validation.loginSchema), authController.login);
router.post('/verify-2fa', authLimiter, validate(validation.verify2FASchema), authController.verify2FA);
router.post('/forgot-password', authLimiter, validate(validation.forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', authLimiter, validate(validation.resetPasswordSchema), authController.resetPassword);
router.post('/send-otp', authLimiter, validate(validation.sendOtpSchema), authController.sendOtp);
router.post('/verify-otp', authLimiter, validate(validation.verifyOtpSchema), authController.verifyOtpLogin);

router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authController.googleCallback);


export default router;