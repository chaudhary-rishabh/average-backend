import Review from '../models/review.model';

export const createReview = async (data: { blog: string; rating: number; comment?: string }, user: any) => {
    return Review.create({ ...data, user: user._id });
};

export const getReviews = async (blogId?: string) => {
    const query = blogId ? { blog: blogId } : {};
    return Review.find(query).populate('user', 'name');
};

export const updateReview = async (id: string, data: Partial<{ rating: number; comment: string }>, user: any) => {
    const review = await Review.findById(id);
    if (!review || review.user.toString() !== user._id.toString()) throw new Error('Unauthorized or review not found');
    return Review.findByIdAndUpdate(id, data, { new: true });
};

export const deleteReview = async (id: string, user: any) => {
    const review = await Review.findById(id);
    if (!review || review.user.toString() !== user._id.toString()) throw new Error('Unauthorized or review not found');
    await Review.findByIdAndDelete(id);
};