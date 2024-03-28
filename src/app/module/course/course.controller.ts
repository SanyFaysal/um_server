import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { CourseService } from "./course.service";
import sendResponse from "../../../utils/sendResponse";
import { ICourse } from "./course.interface";
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


export const CourseController = {
    createCourse
}