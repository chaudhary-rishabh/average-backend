import { Router } from 'express';
import authRoutes from './auth.routes';
import blogRoutes from './blog.routes';
import faqRoutes from './faq.routes';
import pricingRoutes from './pricing.routes';
import reviewRoutes from './review.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/blogs', blogRoutes);
router.use('/faqs', faqRoutes);
router.use('/pricings', pricingRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);

export default router;