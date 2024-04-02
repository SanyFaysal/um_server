import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.route('/')
    .post(CategoryController.createCategory)
    .get(CategoryController.getAllCategories);




export const CategoryRoutes = router;