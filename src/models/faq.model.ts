import { Schema, model, Document } from 'mongoose';

interface IFAQ extends Document {
    question: string;
    answer: string;
}

const faqSchema = new Schema<IFAQ>(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },
    },
    { timestamps: true }
);

export default model<IFAQ>('FAQ', faqSchema);