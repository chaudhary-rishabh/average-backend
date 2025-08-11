import { Request, Response } from 'express';
import * as blogService from '../services/blog.service';

export const createBlog = async (req: Request, res: Response) => {
    try {
        const blog = await blogService.createBlog(req.body, req.user as any);
        res.status(201).json(blog);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const getBlogs = async (req: Request, res: Response) => {
    const blogs = await blogService.getBlogs();
    res.json(blogs);
};

export const getBlogById = async (req: Request, res: Response) => {
    const blog = await blogService.getBlogById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
};

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const blog = await blogService.updateBlog(req.params.id, req.body, req.user as any);
        res.json(blog);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        await blogService.deleteBlog(req.params.id, req.user as any);
        res.json({ message: 'Blog deleted' });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const likeBlog = async (req: Request, res: Response) => {
    try {
        const like = await blogService.likeBlog(req.params.id, req.user as any);
        res.json(like);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const commentOnBlog = async (req: Request, res: Response) => {
    try {
        const comment = await blogService.commentOnBlog(req.params.id, req.body, req.user as any);
        res.status(201).json(comment);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};