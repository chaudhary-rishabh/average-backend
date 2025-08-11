import request from 'supertest';
import app from '../../app';
import User from '../../models/user.model';
import Blog from '../../models/blog.model';
import { generateAccessToken } from '../../utils/jwt.util';

describe('Blog Integration Tests', () => {
    let userToken: string;
    let adminToken: string;
    let userId: string;

    beforeEach(async () => {
        await User.deleteMany({});
        await Blog.deleteMany({});

        const user = await User.create({ name: 'User', email: 'user@example.com', password: 'hashed', role: 'user', isVerified: true });
        const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: 'hashed', role: 'admin', isVerified: true });
        userId = user._id.toString();
        userToken = generateAccessToken(user);
        adminToken = generateAccessToken(admin);
    });

    test('POST /api/blogs should create a blog for authenticated user', async () => {
        const response = await request(app)
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ title: 'Test Blog', content: 'Content' })
            .expect(201);

        expect(response.body.title).toBe('Test Blog');
        const blog = await Blog.findById(response.body._id);
        expect(blog).toBeDefined();
        expect(blog!.author.toString()).toBe(userId);
    });

    test('GET /api/blogs should return all blogs', async () => {
        await Blog.create({ title: 'Blog1', content: 'Content1', author: userId });

        const response = await request(app)
            .get('/api/blogs')
            .expect(200);

        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toBe('Blog1');
    });

    test('POST /api/blogs/:id/like should like a blog', async () => {
        const blog = await Blog.create({ title: 'Blog', content: 'Content', author: userId });

        await request(app)
            .post(`/api/blogs/${blog._id}/like`)
            .set('Authorization', `Bearer ${userToken}`)
            .expect(200);

        const updatedBlog = await Blog.findById(blog._id);
        expect(updatedBlog!.likes).toBe(1);
    });

    test('POST /api/faqs should require admin role', async () => {
        await request(app)
            .post('/api/faqs')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ question: 'Q', answer: 'A' })
            .expect(403);

        await request(app)
            .post('/api/faqs')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ question: 'Q', answer: 'A' })
            .expect(201);
    });
});