import { Schema, model, Document } from 'mongoose';

interface IComment extends Document {
    text: string;
    user: Schema.Types.ObjectId;
    blog: Schema.Types.ObjectId;
    parentComment?: Schema.Types.ObjectId;
}

const commentSchema = new Schema<IComment>(
    {
        text: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
        parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' },
    },
    { timestamps: true }
);

export default model<IComment>('Comment', commentSchema);