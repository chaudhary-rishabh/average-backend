import { Request, Response } from 'express';
import * as faqService from '../services/faq.service';

export const createFAQ = async (req: Request, res: Response) => {
    try {
        const faq = await faqService.createFAQ(req.body);
        res.status(201).json(faq);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const getFAQs = async (req: Request, res: Response) => {
    const faqs = await faqService.getFAQs();
    res.json(faqs);
};

export const updateFAQ = async (req: Request, res: Response) => {
    try {
        const faq = await faqService.updateFAQ(req.params.id, req.body);
        res.json(faq);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteFAQ = async (req: Request, res: Response) => {
    await faqService.deleteFAQ(req.params.id);
    res.json({ message: 'FAQ deleted' });
};