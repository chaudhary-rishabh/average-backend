import request from 'supertest';
import app from '../../app';
import User from '../../models/user.model';
import bcrypt from 'bcryptjs';

describe('Auth Integration Tests', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    test('POST /api/auth/signup should create a new user', async () => {
        const response = await request(app)
            .post('/api/auth/signup')
            .send({ name: 'Test User', email: 'test@example.com', password: 'password123' })
            .expect(201);

        expect(response.body.message).toBe('User created. Verification email sent.');
        const user = await User.findOne({ email: 'test@example.com' });
        expect(user).toBeDefined();
        expect(await bcrypt.compare('password123', user!.password!)).toBe(true);
    });

    test('POST /api/auth/signup should fail if email exists', async () => {
        await User.create({ name: 'Existing', email: 'test@example.com', password: 'hashed' });

        await request(app)
            .post('/api/auth/signup')
            .send({ name: 'Test User', email: 'test@example.com', password: 'password123' })
            .expect(400);
    });

    test('POST /api/auth/login should login verified user', async () => {
        const hashed = await bcrypt.hash('password123', 10);
        await User.create({ name: 'Test', email: 'test@example.com', password: hashed, isVerified: true });

        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'password123' })
            .expect(200);

        expect(response.body.message).toBe('2FA code sent to email.');
        expect(response.body.accessToken).toBeDefined();
    });

    test('POST /api/auth/login should fail with invalid credentials', async () => {
        await request(app)
            .post('/api/auth/login')
            .send({ email: 'wrong@example.com', password: 'wrong' })
            .expect(401);
    });
});