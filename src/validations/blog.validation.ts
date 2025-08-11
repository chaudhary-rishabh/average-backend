import { z } from 'zod';

export const createBlogSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
});

export const updateBlogSchema = z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
});

export const commentSchema = z.object({
    text: z.string().min(1),
    parentComment: z.string().optional(),
});