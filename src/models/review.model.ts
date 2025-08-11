import { Schema, model, Document } from 'mongoose';

interface IReview extends Document {
    user: Schema.Types.ObjectId;
    blog: Schema.Types.ObjectId;
    rating: number;
    comment: string;
}

const reviewSchema = new Schema<IReview>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String },
    },
    { timestamps: true }
);

export default model<IReview>('Review', reviewSchema);