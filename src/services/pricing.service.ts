import Pricing from '../models/pricing.model';

export const createPricing = async (data: { plan: string; price: number; features: string[] }) => {
    return Pricing.create(data);
};

export const getPricings = async () => {
    return Pricing.find();
};

export const updatePricing = async (id: string, data: Partial<{ plan: string; price: number; features: string[] }>) => {
    return Pricing.findByIdAndUpdate(id, data, { new: true });
};

export const deletePricing = async (id: string) => {
    await Pricing.findByIdAndDelete(id);
};