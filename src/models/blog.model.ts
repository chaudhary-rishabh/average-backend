import { Schema, model, Document } from 'mongoose';

interface IBlog extends Document {
    title: string;
    content: string;
    author: Schema.Types.ObjectId;
    likes: number;
    comments: Schema.Types.ObjectId[];
}

const blogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        likes: { type: Number, default: 0 },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    },
    { timestamps: true }
);

export default model<IBlog>('Blog', blogSchema);