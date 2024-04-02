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
    message: "Course created successful",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await CourseService.getAllCourses(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Courses retrieved successfully",
    meta: {
      page,
      limit,
      total: result.totalCount,
    },
    data: result.courses,
  });
});
const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const result = await CourseService.getSingleCourse(courseId);

  return sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course retrieve successful",
    data: result,
  });
});
const getSingleCourseReviews = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const result = await CourseService.getSingleCourseReview(courseId);

    return sendResponse<ICourseReviewResult>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Course with reviews retrieve successful",
      data: result,
    });
  }
);

const getBestCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.getBestCourse();

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course with reviews retrieve successful",
    data: result,
  });
});

const updateSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const payload = req.body;

  const result = await CourseService.updateSingleCourse(courseId, payload);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course retrieve successful",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  getBestCourse,
  getSingleCourseReviews,
  updateSingleCourse,
};
