import Blog from '../models/blog.model';
import Comment from '../models/comment.model';
import Like from '../models/like.model';

export const createBlog = async (data: { title: string; content: string }, user: any) => {
    return Blog.create({ ...data, author: user._id });
};

export const getBlogs = async () => {
    return Blog.find().populate('author', 'name');
};

export const getBlogById = async (id: string) => {
    return Blog.findById(id).populate('author', 'name').populate('comments');
};

export const updateBlog = async (id: string, data: Partial<{ title: string; content: string }>, user: any) => {
    const blog = await Blog.findById(id);
    if (!blog || blog.author.toString() !== user._id.toString()) throw new Error('Unauthorized or blog not found');
    return Blog.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBlog = async (id: string, user: any) => {
    const blog = await Blog.findById(id);
    if (!blog || blog.author.toString() !== user._id.toString()) throw new Error('Unauthorized or blog not found');
    await Blog.findByIdAndDelete(id);
};

export const likeBlog = async (blogId: string, user: any) => {
    const existingLike = await Like.findOne({ user: user._id, blog: blogId });
    if (existingLike) throw new Error('Already liked');
    const like = await Like.create({ user: user._id, blog: blogId });
    await Blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } });
    return like;
};

export const commentOnBlog = async (blogId: string, data: { text: string; parentComment?: string }, user: any) => {
    const comment = await Comment.create({ ...data, user: user._id, blog: blogId });
    await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment._id } });
    return comment;
};