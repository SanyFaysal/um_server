import express from 'express';
import { CategoryRoutes } from '../module/category/category.route';
const router = express.Router();

const moduleRoutes = [
    {
        path: '/category',
        route: CategoryRoutes,
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;