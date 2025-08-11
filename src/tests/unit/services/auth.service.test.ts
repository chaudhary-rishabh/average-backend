import * as authService from '../../../services/auth.service';
import User from '../../../models/user.model';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../../../utils/email.util';

jest.mock('../../../models/user.model');
jest.mock('bcryptjs');
jest.mock('../../../utils/email.util');
jest.mock('../../../utils/otp.util');

describe('Auth Service Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('signup should create a new user and hash password', async () => {
        const data = { name: 'Test User', email: 'test@example.com', password: 'password123' };
        (User.findOne as jest.Mock).mockResolvedValue(null);
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
        (User.create as jest.Mock).mockResolvedValue({ ...data, password: 'hashedPassword', verificationCode: expect.any(String) });

        const user = await authService.signup(data);
        expect(User.create).toHaveBeenCalledWith(expect.objectContaining({ password: 'hashedPassword' }));
        expect(user).toBeDefined();
    });

    test('signup should throw error if user exists', async () => {
        const data = { name: 'Test User', email: 'test@example.com', password: 'password123' };
        (User.findOne as jest.Mock).mockResolvedValue({});

        await expect(authService.signup(data)).rejects.toThrow('User already exists');
    });

    test('login should return user if credentials are valid', async () => {
        const userMock = { email: 'test@example.com', password: 'hashed', isVerified: true };
        (User.findOne as jest.Mock).mockResolvedValue(userMock);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);

        const user = await authService.login('test@example.com', 'password123');
        expect(user).toEqual(userMock);
    });

    test('login should throw error if invalid credentials', async () => {
        (User.findOne as jest.Mock).mockResolvedValue({ password: 'hashed', isVerified: true });
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await expect(authService.login('test@example.com', 'wrong')).rejects.toThrow('Invalid credentials');
    });

    test('sendVerificationEmail should send email with code', async () => {
        const userMock = { email: 'test@example.com', verificationCode: '123456' };
        (User.findOne as jest.Mock).mockResolvedValue(userMock);
        (sendEmail as jest.Mock).mockResolvedValue(true);

        await authService.sendVerificationEmail('test@example.com');
        expect(sendEmail).toHaveBeenCalledWith('test@example.com', 'Verify Email', expect.stringContaining('123456'));
    });
});