import { Request, Response } from 'express';
import * as pricingService from '../services/pricing.service';

export const createPricing = async (req: Request, res: Response) => {
    try {
        const pricing = await pricingService.createPricing(req.body);
        res.status(201).json(pricing);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const getPricings = async (req: Request, res: Response) => {
    const pricings = await pricingService.getPricings();
    res.json(pricings);
};

export const updatePricing = async (req: Request, res: Response) => {
    try {
        const pricing = await pricingService.updatePricing(req.params.id, req.body);
        res.json(pricing);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const deletePricing = async (req: Request, res: Response) => {
    await pricingService.deletePricing(req.params.id);
    res.json({ message: 'Pricing deleted' });
};