import { Router } from 'express';
import * as faqController from '../controllers/faq.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import * as validation from '../validations/faq.validation';
import { ROLES } from '../constants/roles';

const router = Router();

router.post('/', authenticate, authorize([ROLES.ADMIN]), validate(validation.createFAQSchema), faqController.createFAQ);
router.get('/', faqController.getFAQs);
router.put('/:id', authenticate, authorize([ROLES.ADMIN]), validate(validation.updateFAQSchema), faqController.updateFAQ);
router.delete('/:id', authenticate, authorize([ROLES.ADMIN]), faqController.deleteFAQ);

export default router;