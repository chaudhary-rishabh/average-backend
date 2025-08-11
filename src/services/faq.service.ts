import FAQ from '../models/faq.model';

export const createFAQ = async (data: { question: string; answer: string }) => {
    return FAQ.create(data);
};

export const getFAQs = async () => {
    return FAQ.find();
};

export const updateFAQ = async (id: string, data: Partial<{ question: string; answer: string }>) => {
    return FAQ.findByIdAndUpdate(id, data, { new: true });
};

export const deleteFAQ = async (id: string) => {
    await FAQ.findByIdAndDelete(id);
};