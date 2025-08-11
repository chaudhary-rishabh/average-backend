import * as blogService from '../../../services/blog.service';
import Blog from '../../../models/blog.model';
import Like from '../../../models/like.model';
import Comment from '../../../models/comment.model';

jest.mock('../../../models/blog.model');
jest.mock('../../../models/like.model');
jest.mock('../../../models/comment.model');

describe('Blog Service Unit Tests', () => {
    const userMock = { _id: 'user123' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('createBlog should create a new blog', async () => {
        const data = { title: 'Test Blog', content: 'Content' };
        (Blog.create as jest.Mock).mockResolvedValue({ ...data, author: userMock._id });

        const blog = await blogService.createBlog(data, userMock);
        expect(Blog.create).toHaveBeenCalledWith({ ...data, author: userMock._id });
        expect(blog).toBeDefined();
    });

    test('likeBlog should add a like if not existing', async () => {
        (Like.findOne as jest.Mock).mockResolvedValue(null);
        (Like.create as jest.Mock).mockResolvedValue({ user: userMock._id, blog: 'blog123' });
        (Blog.findByIdAndUpdate as jest.Mock).mockResolvedValue(true);

        const like = await blogService.likeBlog('blog123', userMock);
        expect(Like.create).toHaveBeenCalled();
        expect(Blog.findByIdAndUpdate).toHaveBeenCalledWith('blog123', { $inc: { likes: 1 } });
        expect(like).toBeDefined();
    });

    test('likeBlog should throw error if already liked', async () => {
        (Like.findOne as jest.Mock).mockResolvedValue({});

        await expect(blogService.likeBlog('blog123', userMock)).rejects.toThrow('Already liked');
    });

    test('commentOnBlog should create a comment and update blog', async () => {
        const data = { text: 'Comment text' };
        (Comment.create as jest.Mock).mockResolvedValue({ _id: 'comment123', ...data, user: userMock._id, blog: 'blog123' });
        (Blog.findByIdAndUpdate as jest.Mock).mockResolvedValue(true);

        const comment = await blogService.commentOnBlog('blog123', data, userMock);
        expect(Comment.create).toHaveBeenCalled();
        expect(Blog.findByIdAndUpdate).toHaveBeenCalledWith('blog123', { $push: { comments: 'comment123' } });
        expect(comment).toBeDefined();
    });
});