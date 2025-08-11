import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import * as validation from '../validations/auth.validation';
import passport from 'passport';

const router = Router();

router.post('/signup', validate(validation.signupSchema), authController.signup);
router.post('/verify-email', validate(validation.verifyEmailSchema), authController.verifyEmail);
router.post('/login', validate(validation.loginSchema), authController.login);
router.post('/verify-2fa', validate(validation.verify2FASchema), authController.verify2FA);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.post('/forgot-password', validate(validation.forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(validation.resetPasswordSchema), authController.resetPassword);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authController.googleCallback);
router.post('/send-otp', validate(validation.sendOtpSchema), authController.sendOtp);
router.post('/verify-otp', validate(validation.verifyOtpSchema), authController.verifyOtpLogin);

export default router;