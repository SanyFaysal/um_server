import express from "express";
import { CourseController } from "./course.controller";
const router = express.Router();


router.route('/')
    .post(CourseController.createCourse)


export const CourseRoutes = router;