import User from '../models/user.model';

export const updateProfile = async (user: any, data: { name?: string; phone?: string }, profilePic?: string) => {
    const updateData: any = { ...data };
    if (profilePic) updateData.profilePic = profilePic;
    return User.findByIdAndUpdate(user._id, updateData, { new: true });
};