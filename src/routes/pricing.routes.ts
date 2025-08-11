import { Router } from 'express';
import * as pricingController from '../controllers/pricing.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import * as validation from '../validations/pricing.validation';
import { ROLES } from '../constants/roles';

const router = Router();

router.post('/', authenticate, authorize([ROLES.ADMIN]), validate(validation.createPricingSchema), pricingController.createPricing);
router.get('/', pricingController.getPricings);
router.put('/:id', authenticate, authorize([ROLES.ADMIN]), validate(validation.updatePricingSchema), pricingController.updatePricing);
router.delete('/:id', authenticate, authorize([ROLES.ADMIN]), pricingController.deletePricing);

export default router;