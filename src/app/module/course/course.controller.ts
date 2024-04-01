import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { CourseService } from "./course.service";
import sendResponse from "../../../utils/sendResponse";
import { ICourse, ICourseReviewResult } from "./course.interface";
import httpStatus from "http-status";

const createCourse = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await CourseService.createCourse(data);

    return sendResponse<ICourse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course created successful',
        data: result
    })
});


const getAllCourses = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.getAllCourses();
    return sendResponse<ICourse[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses retrieve successful',
        data: result
    })
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const result = await CourseService.getSingleCourse(courseId);

    return sendResponse<ICourse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course retrieve successful',
        data: result
    })
});
const getSingleCourseReviews = catchAsync(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const result = await CourseService.getSingleCourseReview(courseId);

    return sendResponse<ICourseReviewResult>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course with reviews retrieve successful',
        data: result
    })
});

const getBestCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.getBestCourse();

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course with reviews retrieve successful',
        data: result
    })
});

const updateSingleCourse = catchAsync(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const payload = req.body;

    const result = await CourseService.updateSingleCourse(courseId, payload);
    return sendResponse<ICourse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course retrieve successful',
        data: result
    })
});


export const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    getBestCourse,
    getSingleCourseReviews,
    updateSingleCourse,
}