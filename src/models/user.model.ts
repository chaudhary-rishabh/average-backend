import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    phone?: string;
    profilePic?: string;
    isVerified: boolean;
    verificationCode?: string;
    twoFACode?: string;
    googleId?: string;
    role: string;
    resetToken?: string;
    resetTokenExpiry?: Date;
    otpCode?: string;
    otpExpiry?: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String },
        phone: { type: String },
        profilePic: { type: String },
        isVerified: { type: Boolean, default: false },
        verificationCode: { type: String },
        twoFACode: { type: String },
        googleId: { type: String },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        resetToken: { type: String },
        resetTokenExpiry: { type: Date },
        otpCode: { type: String },
        otpExpiry: { type: Date },
    },
    { timestamps: true }
);

export default model<IUser>('User', userSchema);