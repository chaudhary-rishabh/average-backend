import { z } from 'zod';

export const createPricingSchema = z.object({
    plan: z.string().min(1),
    price: z.number().positive(),
    features: z.array(z.string()),
});

export const updatePricingSchema = z.object({
    plan: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    features: z.array(z.string()).optional(),
});