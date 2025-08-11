import { Schema, model, Document } from 'mongoose';

interface IPricing extends Document {
    plan: string;
    price: number;
    features: string[];
}

const pricingSchema = new Schema<IPricing>(
    {
        plan: { type: String, required: true },
        price: { type: Number, required: true },
        features: [{ type: String }],
    },
    { timestamps: true }
);

export default model<IPricing>('Pricing', pricingSchema);