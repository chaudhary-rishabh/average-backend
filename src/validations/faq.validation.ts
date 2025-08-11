import { z } from 'zod';

export const createFAQSchema = z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
});

export const updateFAQSchema = z.object({
    question: z.string().min(1).optional(),
    answer: z.string().min(1).optional(),
});