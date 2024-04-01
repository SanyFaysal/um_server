import express from "express";
import { CourseController } from "./course.controller";
const router = express.Router();


router.route('/')
    .post(CourseController.createCourse)
    .get(CourseController.getAllCourses)

router.route('/best')
    .get(CourseController.getBestCourse)



router.route('/:courseId/reviews')
    .get(CourseController.getSingleCourseReviews)


router.route('/:courseId')
    .get(CourseController.getSingleCourse)
    .put(CourseController.updateSingleCourse)




export const CourseRoutes = router;