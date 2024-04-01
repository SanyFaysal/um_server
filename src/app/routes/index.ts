import express from 'express';
import { CategoryRoutes } from '../module/category/category.route';
import { CourseRoutes } from '../module/course/course.route';
import { ReviewRoutes } from '../module/review/review.route';
const router = express.Router();

const moduleRoutes = [
    {
        path: '/categories',
        route: CategoryRoutes,
    },
    {
        path: '/courses',
        route: CourseRoutes,
    },
    {
        path: '/reviews',
        route: ReviewRoutes,
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;