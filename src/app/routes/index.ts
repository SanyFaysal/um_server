import express from "express";
import { CategoryRoutes } from "../module/category/category.route";
import { CourseRoutes } from "../module/course/course.route";
import { ReviewRoutes } from "../module/review/review.route";
import { UserRoutes } from "../module/user/user.route";
import { BestCourseRoute } from "../module/bestCourse/bestCourse.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/course",
    route: BestCourseRoute,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
