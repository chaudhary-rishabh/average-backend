import { Router } from 'express';
import * as reviewController from '../controllers/review.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import * as validation from '../validations/review.validation';

const router = Router();

router.post('/', authenticate, validate(validation.createReviewSchema), reviewController.createReview);
router.get('/', reviewController.getReviews);
router.put('/:id', authenticate, validate(validation.updateReviewSchema), reviewController.updateReview);
router.delete('/:id', authenticate, reviewController.deleteReview);

export default router;