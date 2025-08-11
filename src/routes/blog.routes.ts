import { Router } from 'express';
import * as blogController from '../controllers/blog.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import * as validation from '../validations/blog.validation';

const router = Router();

router.post('/', authenticate, validate(validation.createBlogSchema), blogController.createBlog);
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id', authenticate, validate(validation.updateBlogSchema), blogController.updateBlog);
router.delete('/:id', authenticate, blogController.deleteBlog);
router.post('/:id/like', authenticate, blogController.likeBlog);
router.post('/:id/comment', authenticate, validate(validation.commentSchema), blogController.commentOnBlog);

export default router;