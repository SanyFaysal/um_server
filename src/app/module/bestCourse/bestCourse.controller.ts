import httpStatus from 'http-status';

import { BestCourseServices } from './bestCourseService';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';

const getBestCourse = catchAsync(async (req, res) => {
  const result = await BestCourseServices.getBestCourseFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Best course retrieved successfully',
    data: result,
  });
});

export const BestCourseControllers = {
  getBestCourse,
};
