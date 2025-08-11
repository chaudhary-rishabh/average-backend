import { Schema, model, Document } from 'mongoose';

interface ILike extends Document {
    user: Schema.Types.ObjectId;
    blog: Schema.Types.ObjectId;
}

const likeSchema = new Schema<ILike>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    },
    { timestamps: true }
);

likeSchema.index({ user: 1, blog: 1 }, { unique: true });

export default model<ILike>('Like', likeSchema);