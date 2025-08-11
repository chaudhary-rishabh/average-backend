import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = Router();

router.patch('/profile', authenticate, upload.single('profilePic'), userController.updateProfile);

export default router;