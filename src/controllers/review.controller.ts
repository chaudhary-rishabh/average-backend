import { Request, Response } from 'express';
import * as reviewService from '../services/review.service';

export const createReview = async (req: Request, res: Response) => {
    try {
        const review = await reviewService.createReview(req.body, req.user as any);
        res.status(201).json(review);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const getReviews = async (req: Request, res: Response) => {
    const reviews = await reviewService.getReviews(req.query.blogId as string);
    res.json(reviews);
};

export const updateReview = async (req: Request, res: Response) => {
    try {
        const review = await reviewService.updateReview(req.params.id, req.body, req.user as any);
        res.json(review);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteReview = async (req: Request, res: Response) => {
    try {
        await reviewService.deleteReview(req.params.id, req.user as any);
        res.json({ message: 'Review deleted' });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};